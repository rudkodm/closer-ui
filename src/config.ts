import {Injectable} from '@angular/core';

@Injectable()
export class AppConfiguration {

    env:string;

    constructor() {
        this.env = window.location.hostname;
    }


    regionsURL = () => {
        return this.url('api/regions')
    };

    regionByIdURL = (regionID: string) => {
        return this.url(`api/regions/${regionID}`);
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

    providerByIdURL = (regionID: string) => {
        return this.url(`api/providers/${regionID}`);
    };

    promoOfRegionURL = (regionID: string) => {
        return this.url(`api/regions/${regionID}/promotions`);
    };

    geoApiURL = (address: string) => {
        return `https://maps.googleapis.com/maps/api/geocode/json?&address=${address}`;
    }


    /**
     * Resolve HOST + PORT part of the URL
     * @returns {string}
     */
    private getApiHost():string {
        switch (this.env) {
            case'localhost':
                return 'http://localhost:9000/';
            case'young-hollows-98001.herokuapp.com':
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