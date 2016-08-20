import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AppConfiguration} from "../../../config";
import {Promotion} from "../../model";

@Injectable()
export class PromotionsService {

    constructor(private http: Http, private conf: AppConfiguration) {
    }

    getPromotions():Promise<Promotion[]> {
        return this.http.get(this.conf.promotionsURL())
            .toPromise()
            .then(response => response.json());
    }

    getPromotionById(id:string):Promise<Promotion> {
        return this.http.get(this.conf.promotionByIdURL(id))
            .toPromise()
            .then(response => response.json())
    }


    update(promotion:Promotion): Promise<Promotion> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.conf.promotionByIdURL(promotion.id), JSON.stringify(promotion, this.dateReplacer), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    save(promotion:Promotion): Promise<Promotion> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.conf.promotionsURL(), JSON.stringify(promotion, this.dateReplacer), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    delete(promotion: Promotion) {
        return this.http.delete(this.conf.promotionByIdURL(promotion.id))
            .toPromise()
            .then(response => response.json())
    }

    dateReplacer(key, val) {
        if (key == "expirationDateTime") {
            val = new Date(val.toString()).toISOString()
        }
        return val
    };
}


