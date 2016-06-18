import {Injectable} from 'angular2/core';

@Injectable()
export class AppConfiguration {

    env:string;

    constructor() {
        this.env = window.location.hostname;
    }


    regionsURL = () => {
        return this.url('api/regions')
    };

    promoOfRegionURL = (regionID: string) => {
        return this.url(`api/regions/${regionID}/promotions`);
    }


    /**
     * Resolve HOST + PORT part of the URL
     * @returns {string}
     */
    private getApiHost():string {
        switch (this.env) {
            case'localhost':
                return 'http://localhost:9000/';
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