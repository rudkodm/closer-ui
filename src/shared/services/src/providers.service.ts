import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AppConfiguration} from "../../../config";
import {ServiceProvider} from "../../model";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ProvidersService {
    constructor(private http:AuthHttp, private conf:AppConfiguration) {
    }
    getProviders():Promise<ServiceProvider[]> {
        return this.http.get(this.conf.providersURL())
            .toPromise()
            .then(response => response.json());
    }

    getServiceProviderById(id:string):Promise<ServiceProvider> {
        return this.http.get(this.conf.providerByIdURL(id))
            .toPromise()
            .then(response => response.json())
    }


    update(ServiceProvider:ServiceProvider): Promise<ServiceProvider> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.conf.providerByIdURL(ServiceProvider.id), JSON.stringify(ServiceProvider), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    save(ServiceProvider:ServiceProvider): Promise<ServiceProvider> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.conf.providersURL(), JSON.stringify(ServiceProvider), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    delete(ServiceProvider: ServiceProvider) {
        return this.http.delete(this.conf.providerByIdURL(ServiceProvider.id))
            .toPromise()
            .then(response => response.json())
    }
}

