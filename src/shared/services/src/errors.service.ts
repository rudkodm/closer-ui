import {Injectable, EventEmitter, OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class ErrorsService {

    private errorAddedSource = new Subject<ErrorMsg>();

    errorAdded = this.errorAddedSource.asObservable();

    addError(error: ErrorMsg) {
        this.errorAddedSource.next(error);
    }

    onError(handler): Subscription {
        return this.errorAdded.subscribe(handler)
    }
}

export interface ErrorMsg {
    title?: string
    msg?: string
    description?: string
    details?: any
}