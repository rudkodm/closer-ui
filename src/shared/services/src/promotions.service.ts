/**
 * Service PromotionsService
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import 'rxjs/add/operator/toPromise';
import {AppConfiguration} from "../../../config";

@Injectable()
export class PromotionsService {

    private url;

    constructor(private http:Http, private conf:AppConfiguration) {
        this.url = conf.promoOfRegionURL;
    }

    getPromotionsOf(regionID:string):Promise<Promotion[]> {
        return this.http.get(this.url(regionID))
            .toPromise()
            .then(response => response.json())
    }


}


export class Promotion {
    id:string;
    serviceId:string;
    promoCode:string;
    media:string;
    title:string;
    expirationDateTime:Date;
    shortDescription:string;
    fullDescription:string;
}