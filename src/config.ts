import {Injectable} from "@angular/core";
declare let env: any;

@Injectable()
export class AppConfiguration {

    env:string;
    origin: string;

    constructor() {
        this.env = window.location.hostname;
        this.origin = window.location.origin;
    }

    regionsURL = () => {
        return this.url('api/regions')
    };

    regionByIdURL = (regionID: string) => {
        return this.url(`api/regions/${regionID}`);
    };

    coverRegion = () => {
        return this.url(`api/regions/cover`);
    };

    companiesURL = () => {
        return this.url('api/companies')
    };

    companyByIdURL = (regionID: string) => {
        return this.url(`api/companies/${regionID}`);
    };

    providersURL = () => {
        return this.url('api/providers')
    };

    providerByIdURL = (id: string) => {
        return this.url(`api/providers/${id}`);
    };

    providerByProfileIdURL = (id: string) => {
        return this.url(`api/providers/q?profileId=${id}`);
    };

    promotionsOfRegionURL = (id: string) => {
        return this.url(`api/regions/${id}/promotions`);
    };

    promotionsURL = () => {
        return this.url('api/promotions')
    };

    promotionsByServiceIdURL = (id: string) => {
        return this.url(`api/promotions/q?serviceId=${id}`)
    };

    promotionByIdURL = (id: string) => {
        return this.url(`api/promotions/${id}`);
    };

    geoApiURL = (address: string) => {
        return `https://maps.googleapis.com/maps/api/geocode/json?&address=${address}`;
    };


    getCallbackUrl() {
        return `${this.origin}/login`
    }

    /**
     * Resolve HOST + PORT part of the URL
     * @returns {string}
     */
    private getApiHost():string {
        return API_HOST;
    }

    /**
     *  Return Target API URL
     * @param resource
     * @returns {string}
     */
    private url(resource:string) {
        return `${this.getApiHost()}/${resource}`;
    }


}

export const API_HOST = env.API_HOST || 'http://localhost:9000';
export const GOOGLE_API_KEY = env.GOOGLE_API_KEY;
export const AUTH_CLIENT_ID = env.AUTH_CLIENT_ID;
export const AUTH_DOMAIN = env.AUTH_DOMAIN;