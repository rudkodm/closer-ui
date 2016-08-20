import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {AppConfiguration} from "../../../config";
import {Location} from "../../model";

@Injectable()
export class LocationService {

    private url;

    constructor(private http: Http, private conf: AppConfiguration) {
    }

    getLocationOf(address: string) {
        return this.http.get(this.conf.geoApiURL(address))
            .toPromise()
            .then(response => {
                let json = response.json();
                let loc = json.results[0].geometry.location;
                let location = new Location();
                location.latitude = loc.lat;
                location.longitude = loc.lng;
                return location
            })
    }
}


