import {Injectable, EventEmitter} from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {AppConfiguration, AUTH_CLIENT_ID, AUTH_DOMAIN} from "../../../config";
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

    private lock: any;
    private userProfile: any;
    private profileDataObtained: EventEmitter<any> = new EventEmitter();
    private authOptions = {
        auth: {
            responseType: 'token',
            redirectUrl: this.config.getCallbackUrl(),
            redirect: true,
        },
        languageDictionary: {
            title: "Admin Tool"
        }
    };

    constructor(private config: AppConfiguration,
                private storage: StorageService,
                private router: Router) {
        this.lock = new Auth0Lock(
            AUTH_CLIENT_ID,
            AUTH_DOMAIN,
            this.authOptions
        );
        this.handleOnAuthenticateEvent();
        this.userProfile = this.storage.getProfile();
    }

    private handleOnAuthenticateEvent() {
        this.lock.on('authenticated', (authResult) => {
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    alert(error);
                    return;
                }
                this.userProfile = profile;
                this.storage.saveIdToken(authResult.idToken);
                this.storage.saveUserProfileId(profile.user_id);
                this.storage.saveProfile(profile);
                this.profileDataObtained.emit(profile);
            });
        });
    }

    public login(options = {allowedConnections: ['Username-Password-Authentication']}) {
        this.lock.show(options);
    };

    public notAuthenticated() {
        return !this.authenticated();
    };

    public authenticated() {
        return tokenNotExpired();
    };

    public isNotVerified(): boolean {
        return !this.isVerified()
    };

    public isVerified(): boolean {
        return this.userProfile
        && this.userProfile.email_verified
    };

    public onAuthenticated(handler: any) {
        this.profileDataObtained.subscribe(handler)
    };

    public onAuthenticationError(handler: any) {
        this.lock.on('authorization_error', handler)
    };

    public isBusinessUser(){
        return this.hasRole('merchant');
    };

    public isAdmin() {
        return this.hasRole('admin');
    };

    private hasRole(role: string) {
        return this.userProfile
            && this.userProfile.user_metadata
            && this.userProfile.user_metadata.roles
            && this.userProfile.user_metadata.roles.indexOf(role) > -1;
    }

    public logout() {
        this.storage.clearStorage();
        this.userProfile = null;
        this.router.navigate(["login"]);
    };

}