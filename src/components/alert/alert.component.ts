import {Component, OnDestroy} from "@angular/core";
import {AlertsService, Alert} from "../../shared/services/src/alert.service";
import {Subscription} from "rxjs/Subscription";
import {Location} from "@angular/common";

@Component({
    selector: 'alerts',
    templateUrl: 'components/alert/alert.component.html',
    styleUrls: ['components/alert/alert.component.css']
})
export class AlertsComponent implements OnDestroy{
    alert: Alert;
    private subscription: Subscription;

    constructor(private location: Location, private messageService: AlertsService) {
        this.subscription = messageService.onAlert((a) => this.alert = a)
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}