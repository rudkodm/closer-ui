import {Component, OnDestroy} from "@angular/core";
import {ErrorsService, ErrorMsg} from "../../shared/services/src/errors.service";
import {Subscription} from "rxjs/Subscription";
import {Location} from "@angular/common";

@Component({
    selector: 'companies',
    templateUrl: 'components/error/error.component.html',
    styleUrls: ['components/error/error.component.css']
})
export class ErrorComponent implements OnDestroy{
    error: ErrorMsg;
    private subscription: Subscription;

    constructor(private location: Location, private errors: ErrorsService) {
        this.subscription = errors.onError((e) => this.error = e)
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}