import {Injectable} from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {AppConfiguration} from "../../../config";

@Injectable()
export class StorageService {

    private storedProfileKey = "profile";
    private storedIdKey = "id_token";
    private profileId = "profileId";
    private providerId = "providerId";


    saveProviderId(providerId: string) {
        localStorage.setItem(this.providerId, providerId);
    }

    getProviderId() : string {
        return localStorage.getItem(this.providerId);
    }


    saveUserProfileId(profileId: string) {
        localStorage.setItem(this.profileId, profileId);
    }

    getUserProfileId() : string {
         return localStorage.getItem(this.profileId);
    }



    saveIdToken(idToken: string) {
        localStorage.setItem(this.storedIdKey, idToken);
    }

    getIdToken() : string {
        return localStorage.getItem(this.storedIdKey);
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

    clearStorage() {
        localStorage.clear()
    }
}