import {Component, ViewChild, OnInit} from "@angular/core";
import {AuthService} from "../../shared/services/src/auth.service";
import {Router} from "@angular/router";
import {ModalComponent} from "ng2-bs4-modal/components/modal";

@Component({
    selector: 'companies',
    templateUrl: 'components/login/login.component.html',
    styleUrls: ['components/login/login.component.css']
})
export class LoginComponent{
    @ViewChild("infoModal") infoModal: ModalComponent;
    public error: any;

    constructor(private auth: AuthService, private router: Router) {
        if (this.auth.authenticated()) {
            this.applyNavigationRules()
        }
        this.auth.onAuthenticated(() => {
            this.applyNavigationRules();
        });
        this.auth.onAuthenticationError((e) => {
            this.error = e;
            this.infoModal.open();
        })
    }

    private applyNavigationRules() {
        if (this.auth.isAdmin()) this.router.navigate(['regions']);
        if (this.auth.isBusinessUser()) this.router.navigate(['provider-info']);
    }
}