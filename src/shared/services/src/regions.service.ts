/**
 * Service RegionsService
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import 'rxjs/add/operator/toPromise';
import {AppConfiguration} from "../../../config";

@Injectable()
export class RegionsService {

    private url;

    constructor(private http:Http, private conf:AppConfiguration) {
        this.url = conf.regionsURL();
    }

    getRegions():Promise<Region[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json())
    }
}


export class Region {
    id:string;
    name:string;
    description:string;
    zone:Zone;
    promotions:string[]
}

export class Zone {
    center:ZoneCenter;
    radius:number;
}

export class ZoneCenter {
    latitude:number;
    longitude:number;
}

