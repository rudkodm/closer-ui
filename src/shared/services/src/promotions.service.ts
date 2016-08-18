import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AppConfiguration} from "../../../config";
import {Promotion} from "../../model";

@Injectable()
export class PromotionsService {

    private url;

    constructor(private http: Http, private conf: AppConfiguration) {
        this.url = conf.promoOfRegionURL;
    }

    getPromotionsOf(regionID: string): Promise<Promotion[]> {
        return this.http.get(this.url(regionID))
            .toPromise()
            .then(response => response.json())
    }
}


