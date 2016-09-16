import {Component, Input, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Promotion} from "../../shared/model";

@Component({
    selector: 'promotion-form',
    templateUrl: 'components/promotion-form/promotion-form.component.html',
    styleUrls : ['components/promotion-form/promotion-form.component.css']
})
export class PromotionFormComponent {
    @Input('selectedPromotion') promotion: Promotion;
    @ViewChild(NgForm) form: NgForm;

    valid() {
        return this.form.form.valid;
    }
}