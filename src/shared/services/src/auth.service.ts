import {Injectable, EventEmitter} from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {AppConfiguration} from "../../../config";
import {StorageService} from "./storage.service";
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

    private lock: any;
    private userProfile: any;
    private profileDataObtained: EventEmitter<any> = new EventEmitter();

    private widgetConfig = {
        callbackURL: this.config.getCallbackUrl(),
        languageDictionary: {
            title: "Admin Tool"
        }
    };

    constructor(private config: AppConfiguration, private storage: StorageService) {
        this.lock = new Auth0Lock(
            this.config.authClientId,
            this.config.authDomain,
            this.widgetConfig
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
                console.log(profile);
                this.storage.saveIdToken(authResult.idToken);
                this.storage.saveUserProfileId(profile.user_id);
                this.storage.saveProfile(profile);
                this.profileDataObtained.emit(profile);
            });
        });
    }

    public login(options = {}) {
        this.lock.show(options);
    };

    public notAuthenticated() {
        return !this.authenticated();
    };

    public authenticated() {
        return tokenNotExpired();
    };

    public onAuthenticated(handler: any) {
        this.profileDataObtained.subscribe(handler)
    };

    public isBusinessUser(){
        return this.hasRole('user');
    };

    public isAdmin() {
        return this.hasRole('admin');
    };

    private hasRole(role: string) {
        return this.userProfile
            && this.userProfile.app_metadata
            && this.userProfile.app_metadata.roles
            && this.userProfile.app_metadata.roles.indexOf(role) > -1;
    }

    public logout() {
        this.storage.removeProfile();
        this.storage.removeIdToken();
    };
}