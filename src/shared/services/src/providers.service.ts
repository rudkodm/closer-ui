import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AppConfiguration} from "../../../config";
import {ServiceProvider} from "../../model";

@Injectable()
export class ProvidersService {
    constructor(private http: Http, private conf: AppConfiguration) {
    }

    getProviders(): Promise<ServiceProvider[]> {
        return this.http.get(this.conf.providersURL())
            .toPromise()
            .then(response => response.json());
    }

    getServiceProviderById(id: string): Promise<ServiceProvider> {
        return this.http.get(this.conf.providerByIdURL(id))
            .toPromise()
            .then(response => response.json())
    }

    getServiceProviderByProfileId(id: string): Promise<ServiceProvider> {
        return this.http.get(this.conf.providerByProfileIdURL(id))
            .toPromise()
            .then(response => response.json())
    }

    checkProviderInfo(profileId: string): Promise<boolean> {
        return this.http.get(this.conf.providerByProfileIdURL(profileId))
            .map(rs => rs.json())
            .map(p => !!p)
            .toPromise()
    }

    update(ServiceProvider: ServiceProvider): Promise<ServiceProvider> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.conf.providerByIdURL(ServiceProvider.id), JSON.stringify(ServiceProvider), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    save(ServiceProvider: ServiceProvider): Promise<ServiceProvider> {
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

