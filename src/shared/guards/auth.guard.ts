import {Injectable} from "@angular/core";
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from "@angular/router";
import {AuthService} from "../services/src/auth.service";
import {StorageService} from "../services/src/storage.service";
import {ErrorsService} from "../services/src/errors.service";

@Injectable()
export class AuthenticatedOnly implements CanActivate {

    constructor(private auth: AuthService,
                private errors: ErrorsService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.authenticated()) return true;
        else {
            this.router
                .navigate(['error'])
                .then(() => this.errors.addError({
                    title: "Authenticated Users Only",
                    msg: "Only Authenticated users are able to proceed to this page"
                }));
            return false;
        }
    }
}

@Injectable()
export class AdminOnly implements CanActivate {

    constructor(private auth: AuthService,
                private errors: ErrorsService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isAdmin()) return true;
        else {
            this.router
                .navigate(['error'])
                .then(() => this.errors.addError({
                    title: "Authorisation Error",
                    msg: "You have no rights to visit this page"
                }));
            return false;
        }
    }
}

@Injectable()
export class ProviderDataWasAdded implements CanActivate{
    constructor(private router: Router,
                private auth: AuthService,
                private storage: StorageService,
                private errors: ErrorsService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.storage.getProviderId() && this.auth.isBusinessUser()) {
            return true
        } else {
            this.router
                .navigate(['error'])
                .then(() => this.errors.addError({
                    title: "Mandatory data wasn't provided",
                    msg: "Please fill all requiter information on Info page before you will be allowed to proceed further"
                }));
            return false;
        }
    }

}

export const guardsProviders: any[] = [
    AuthenticatedOnly,
    AdminOnly,
    ProviderDataWasAdded
];
