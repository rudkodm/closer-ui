import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AppConfiguration} from "../../../config";
import {Company} from "../../model";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class CompaniesService {
    constructor(private http: AuthHttp, private conf:AppConfiguration) {
    }
    getCompanies():Promise<Company[]> {
        return this.http.get(this.conf.companiesURL())
            .toPromise()
            .then(response => response.json());
    }

    getCompanyById(id:string):Promise<Company> {
        return this.http.get(this.conf.companyByIdURL(id))
            .toPromise()
            .then(response => response.json())
    }


    update(company:Company): Promise<Company> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(this.conf.companyByIdURL(company.id), JSON.stringify(company), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    save(company:Company): Promise<Company> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.conf.companiesURL(), JSON.stringify(company), {headers: headers})
            .toPromise()
            .then(response => response.json())
    }

    delete(company: Company) {
        return this.http.delete(this.conf.companyByIdURL(company.id))
            .toPromise()
            .then(response => response.json())
    }
}

