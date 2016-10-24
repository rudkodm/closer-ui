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

        this.auth.onAuthenticated(() => {
            if (auth.isAdmin()) this.router.navigate(['regions']);
            if (auth.isBusinessUser()) this.router.navigate(['provider-info']);
        })
    }
}