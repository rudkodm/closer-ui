import {NgModule} from "@angular/core"
import { CommonModule } from '@angular/common';
import {FormsModule}   from '@angular/forms'
import {ProviderValidatorDirective} from "./directives/src/provider-validator.directive";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ProviderValidatorDirective],
    exports: [ProviderValidatorDirective]
})
export class SharedModule {
}