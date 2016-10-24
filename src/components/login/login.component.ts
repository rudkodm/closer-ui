import {Component} from "@angular/core";
import {AuthService} from "../../shared/services/src/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'companies',
    templateUrl: 'components/login/login.component.html',
    styleUrls: ['components/login/login.component.css']
})
export class LoginComponent {

    constructor(private auth: AuthService, private router: Router) {
        if(this.auth.authenticated()){
            this.applyNavigationRules()
        }
        this.auth.onAuthenticated(() => {
            this.applyNavigationRules();
        })
    }

    private applyNavigationRules() {
        if (this.auth.isAdmin()) this.router.navigate(['regions']);
        if (this.auth.isBusinessUser()) this.router.navigate(['provider-info']);
    }
}