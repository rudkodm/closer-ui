import {Injectable} from "@angular/core";

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


    authClientId = 'hQH2fGLBMyM6XrDE6EtSNIZ0iQXGuv4t';
    authDomain = 'rudko.eu.auth0.com';



    /**
     * Resolve HOST + PORT part of the URL
     * @returns {string}
     */
    private getApiHost():string {
        switch (this.env) {
            case'localhost':
                return 'http://localhost:9000/';
            case'young-hollows-98001.herokuapp.com':
            case'mysterious-chamber-98748.herokuapp.com':
                return 'https://dry-bastion-13599.herokuapp.com/';
            default:
                return 'http://localhost:9000/';
        }
    }

    /**
     *  Return Target API URL
     * @param resource
     * @returns {string}
     */
    private url(resource:string) {
        return this.getApiHost() + resource;
    }


}