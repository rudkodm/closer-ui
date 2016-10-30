import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class AlertsService {

    private alertAddedSource = new Subject<Alert>();

    alertAdded = this.alertAddedSource.asObservable();

    addAlert(error: Alert) {
        this.alertAddedSource.next(error);
    }

    onAlert(handler): Subscription {
        return this.alertAdded.subscribe(handler)
    }
}

export interface Alert {
    severity: string
    title?: string
    msg?: string
    description?: string
    details?: any
}