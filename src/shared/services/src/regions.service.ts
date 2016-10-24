import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Region, Location} from '../../model'

import 'rxjs/add/operator/toPromise';
import {AppConfiguration} from "../../../config";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class RegionsService {

    constructor(private http:AuthHttp, private conf:AppConfiguration) {
    }

    getRegions():Promise<Region[]> {
        return this.http.get(this.conf.regionsURL())
            .toPromise()
            .then(response => response.json());
    }

    getRegionById(id:string):Promise<Region> {
        return this.http.get(this.conf.regionByIdURL(id))
            .toPromise()
            .then(response => response.json())
    }

    getCoverRegion(point: Location):Promise<Region> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.conf.coverRegion(), JSON.stringify(point), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    update(region:Region): Promise<Region> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.conf.regionByIdURL(region.id), JSON.stringify(region), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    save(region:Region): Promise<Region> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.conf.regionsURL(), JSON.stringify(region), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    delete(region: Region) {
        return this.http.delete(this.conf.regionByIdURL(region.id))
            .toPromise()
            .then(response => response.json())
    }
}

