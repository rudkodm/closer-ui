import {Component} from "@angular/core";
import {AuthService} from "../../shared/services/src/auth.service";
import {Router} from "@angular/router";
import {StorageService} from "../../shared/services/src/storage.service";
import {AlertsService} from "../../shared/services/src/alert.service";

@Component({
    selector: 'companies',
    templateUrl: 'components/login/login.component.html',
    styleUrls: ['components/login/login.component.css']
})
export class LoginComponent {

    constructor(private auth: AuthService,
                private router: Router,
                private storage: StorageService,
                private messageService: AlertsService
    ) {
        this.checkLogout();
        this.handleUserAuthentication();
        this.handleAuthenticationError();
    }


    private checkLogout() {
        let notAuthenticated = !this.auth.authenticated();
        let sessionDataWasNotRemoved = !!this.storage.getIdToken();
        if(notAuthenticated && sessionDataWasNotRemoved) this.auth.logout();
    }

    private handleUserAuthentication() {
        if (this.auth.authenticated()) {
            this.applyNavigationRules()
        }

        this.auth.onAuthenticated(() => {
            this.applyNavigationRules()
        });
    }

    private handleAuthenticationError() {
        this.auth.onAuthenticationError((e) => {
            this.router
                .navigate(['alert'])
                .then(() => this.messageService.addAlert({
                    severity: 'info',
                    title: "Verification Required",
                    msg: e.error_description
                }));
        })
    }

    private applyNavigationRules() {
        if (this.auth.isAdmin()) this.toAdminStartPage();
        if (this.auth.isBusinessUser()) this.toUserStartPage();
    };

    private toUserStartPage() {
        this.router.navigate(['provider-info']);
    }

    private toAdminStartPage() {
        this.router.navigate(['regions']);
    }
}