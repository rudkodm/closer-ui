import {Component} from '@angular/core';
import {DateTimePickerDirective} from "ng2-datetime-picker";

@Component({
    selector: 'selectedPromotions',
    moduleId: module.id,
    templateUrl: './promotions.component.html',
    styleUrls : ['./promotions.component.css'],
    directives: [DateTimePickerDirective]
})
export class PromotionsComponent {
    testDate: Date = new Date()
}