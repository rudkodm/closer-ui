/**
 * Service RegionsService
 */
import {Injectable} from 'angular2/core';
import {Headers, Http} from 'angular2/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegionsService {
    host: string = `http://localhost:9000`
    regionsUrl: string = `${this.host}/api/regions`;
    headers:Headers;

    constructor(private http:Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', this.host);
    }

    // getRegions():Promise<Region[]> {
    //     return Promise.resolve([
    //         {id:"56b26adc4268d3818977b4b2", name:"Vulitsa Yakuba Kolasa, Minsk", description: "Plošča Jakuba Kolasa is a Minsk Metro station."},
    //         {id:"56b26adc4268d3818977b4b1", name:"Bangalore Square"}
    //     ])
    // }
    getRegions():Promise<Region[]> {
        return this.http.get(this.regionsUrl, this.headers)
            .toPromise()
            .then(response => response.json())
    }
}
export class Region {
    id:string;
    name:string;
    description:string;
}
