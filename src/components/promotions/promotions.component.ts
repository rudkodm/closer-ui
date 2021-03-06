import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal'
import {Promotion} from "../../shared/model";
import {PromotionsService} from "../../shared/services/src/promotions.service";

import {Utils} from "../../shared/helpers/response.helpers";

@Component({
    selector: 'promotions',
    templateUrl: 'components/promotions/promotions.component.html',
    styleUrls: ['components/promotions/promotions.component.css']
})
export class PromotionsComponent implements OnInit {
    promotions: Promotion[];
    promotion: Promotion = new Promotion();
    error: Error;

    @ViewChild(ModalComponent)
    modal: ModalComponent;
    modalSize = 'lg';

    constructor(private promotionService: PromotionsService) {
    }

    ngOnInit() {
        this.promotionService.getPromotions().then(promotion => {
            this.promotions = promotion;
        }).catch(error => {
            this.error = error
        });
    }

    doSave() {
        this.updateOpt(this.promotion);
        this.clear();
        this.modal.close();
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
        this.promotion = new Promotion();
    }
}