import {Component, OnInit, ViewChild} from "@angular/core";
import {DateTimePickerDirective} from "ng2-datetime-picker";
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal'
import * as _ from 'lodash'
import {Promotion, Region, ServiceProvider} from "../../shared/model";
import {ProvidersService} from "../../shared/services/src/providers.service";
import {RegionsService} from "../../shared/services/src/regions.service";
import {PromotionsService} from "../../shared/services/src/promotions.service";

import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'selectedPromotions',
    moduleId: module.id,
    templateUrl: '/components/promotions/promotions.component.html',
    styleUrls: ['/components/promotions/promotions.component.css'],
    directives: [MODAL_DIRECTIVES, DateTimePickerDirective]
})
export class PromotionsComponent implements OnInit {
    services: ServiceProvider[];
    regions: Region[];
    promotions: Promotion[];
    promotion: Promotion = new Promotion();
    error: Error;
    isAddNewOpt: Boolean = false;
    testDate: Date = new Date()

    @ViewChild('modal')
    modal: ModalComponent;
    modalSize = 'lg';

    constructor(private promotionService: PromotionsService,
                private providerService: ProvidersService,
                private regionsService: RegionsService) {
    }

    ngOnInit() {
        let observables = [
            this.providerService.getProviders(),
            this.regionsService.getRegions(),
            this.promotionService.getPromotions()
        ];
        Observable
            .forkJoin(observables)
            .subscribe(
                data => {
                    this.services = data[0];
                    this.regions = data[1];
                    this.promotions = data[2];
                },
                errors => {
                    this.error = errors[0]
                }
            );
    }

    regionInformationOf(id: string): Region {
        return this.regions.find(r => r.id === id)
    }

    providerInformationOf(id: string): ServiceProvider {
        return this.services.find(s => s.id === id)
    }

    doSave() {
        if (this.isAddNewOpt) {
            this.saveOpt(this.promotion)
        } else {
            this.updateOpt(this.promotion)
        }
        this.clear();
        this.modal.close()
    }

    private saveOpt(promotion: Promotion) {
        this.promotionService.save(promotion)
            .then(p => this.promotions.push(p))
            .catch(error => this.error = error)
    }

    private updateOpt(promotion: Promotion) {
        this.promotionService
            .update(promotion)
            .then(p => this.replaceWith(this.promotions, p))
            .catch(error => this.error = error)
    }

    private replaceWith(promotions: Promotion[], promotion: Promotion) {
        let index = this.findPosition(promotion)
        promotions.splice(index, 1, promotion)
    }

    doEdit(promotion: Promotion) {
        this.promotion = _.cloneDeep(promotion)
        this.modal.open(this.modalSize)
    }

    doAdd() {
        this.isAddNewOpt = true
        this.modal.open(this.modalSize)
    }

    doDelete() {
        this.promotionService
            .delete(this.promotion)
            .catch(error => this.error = error)

        this.removeObject(this.promotions, this.promotion)
        this.modal.close()
    }

    private removeObject(promotions: Promotion[], promotion: Promotion) {
        let index = this.findPosition(promotion)
        promotions.splice(index, 1)
    }

    onDismiss(event) {
        this.clear()
    }


    private clear() {
        this.isAddNewOpt = false
        this.promotion = new Promotion()
    }


    private findPosition(promotion: Promotion) {
        return this.regions.findIndex(p => p.id === promotion.id);
    }
}