import {Injectable} from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthService} from "../services/src/auth.service";

@Injectable()
export class AuthenticatedOnly implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.authenticated()) return true;
        else {
            this.router.navigate(['']);
            return false;
        }
    }
}

@Injectable()
export class AdminOnly implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isAdmin()) return true;
        else {
            this.router.navigate(['error']);
            return false;
        }
    }
}

export const guardsProviders: any[] = [
    AuthenticatedOnly,
    AdminOnly
];
