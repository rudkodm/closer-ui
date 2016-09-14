import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';
import {LocationService} from "../../services/src/location.service";

@Directive({
    selector: '[addressIsInRegion]',
    providers: [
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => ProviderValidatorDirective), multi: true }
        ],
    host: {
        '(blur)': 'onBlur($event)'
    }
})
export class ProviderValidatorDirective implements Validator{

    constructor(private locationService: LocationService){}

    private control: AbstractControl;

    validate(c: AbstractControl): { [key: string]: any } {
        this.control = c;
        return null;
    }

    onBlur(event) {
        let v = this.control.value;
    }

}