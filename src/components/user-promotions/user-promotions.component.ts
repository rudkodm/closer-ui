import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal'
import {Promotion} from "../../shared/model";
import {PromotionsService} from "../../shared/services/src/promotions.service";

import {Utils} from "../../shared/helpers/response.helpers";
import {StorageService} from "../../shared/services/src/storage.service";

@Component({
    selector: 'promotions',
    templateUrl: 'components/promotions/promotions.component.html',
    styleUrls: ['components/promotions/promotions.component.css']
})
export class UserPromotionsComponent implements OnInit {
    promotions: Promotion[];
    promotion: Promotion = new Promotion();
    error: Error;
    isAddNewOpt: Boolean = false;

    @ViewChild(ModalComponent)
    modal: ModalComponent;
    modalSize = 'lg';

    constructor(private promotionService: PromotionsService, private storage: StorageService) {
    }

    ngOnInit() {
        let serviceId = this.storage.getProviderId();
        this.promotionService.getPromotionsByServiceId(serviceId)
            .then(promotions => this.promotions = promotions)
            .catch(error =>  this.error = error );
    }

    doSave() {
        if (this.isAddNewOpt)  this.saveOpt(this.promotion);
        else  this.updateOpt(this.promotion);

        this.clear();
        this.modal.close();
    }

    private saveOpt(promotion: Promotion) {
        this.promotionService.save(promotion)
            .then(p => this.promotions.push(p))
            .catch(error => this.error = error)
    }

    private updateOpt(promotion: Promotion) {
        this.promotionService
            .update(promotion)
            .then(p => Utils.replaceWith(this.promotions, p))
            .catch(error => this.error = error)
    }

    doEdit(promotion: Promotion) {
        this.promotion = Utils.clone(promotion);
        this.modal.open(this.modalSize);
    }

    doAdd() {
        this.isAddNewOpt = true;
        this.modal.open(this.modalSize);
    }

    doDelete() {
        this.promotionService
            .delete(this.promotion)
            .catch(error => this.error = error);

        Utils.removeObject(this.promotions, this.promotion);
        this.modal.close();
    }

    onDismiss(event) {
        this.clear()
    }

    onClose(event) {
        this.clear()
    }

    onOpen(event) {
    }

    private clear() {
        this.isAddNewOpt = false;
        this.promotion = new Promotion();
    }
}