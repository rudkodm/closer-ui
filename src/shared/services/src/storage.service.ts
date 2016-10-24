import {Injectable} from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {AppConfiguration} from "../../../config";

@Injectable()
export class StorageService {

    private storedProfileKey = "profile";
    private storedIdKey = "id_token";
    private profileId = "profileId";

    saveIdToken(idToken: string) {
        localStorage.setItem(this.storedIdKey, idToken);
    }

    getUserProfileId() : string {
         return localStorage.getItem(this.profileId);
    }

    saveUserProfileId(providerId: string) {
        localStorage.setItem(this.profileId, providerId);
    }

    getIdToken() : string {
        return localStorage.getItem(this.storedIdKey);
    }

    removeIdToken() {
        localStorage.removeItem(this.storedIdKey)
    }

    saveProfile(profile: any) {
        localStorage.setItem(this.storedProfileKey, JSON.stringify(profile));
    }

    getProfile(): any {
        let storedProfile = localStorage.getItem(this.storedProfileKey);
        if(storedProfile) {
            return JSON.parse(storedProfile);
        } else {}
    }

    removeProfile() {
        localStorage.removeItem(this.storedProfileKey)
    }
}