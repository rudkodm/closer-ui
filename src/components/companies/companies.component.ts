import {Component, OnInit, ViewChild} from "@angular/core";
import {CompaniesService} from "../../shared/services/src/companies.service";
import {Company, AddressDetails, ContactDetails, ServiceProvider} from "../../shared/model";
import {ModalComponent} from "ng2-bs4-modal/ng2-bs4-modal";
import * as _ from "lodash";

@Component({
    selector: 'companies',
    templateUrl: 'components/companies/companies.component.html',
    styleUrls : ['components/companies/companies.component.css']
})
export class CompaniesComponent implements OnInit{
    companies: Company[];
    services: ServiceProvider[];
    company: Company = new Company();
    error: Error;
    isAddNewOpt: Boolean = false;

    @ViewChild(ModalComponent)
    modal: ModalComponent;
    modalSize = 'lg';

    constructor(private companiesService: CompaniesService) {
    }

    companyOf(service: ServiceProvider) {
        function contains(c : Company, s: ServiceProvider) {
            return c.services.find(it => it.id === s.id) != null
        }
        return this.companies.find(c => contains(c, service))
    }

    ngOnInit() {
        this.companiesService
            .getCompanies()
            .then(companies => {
                this.companies = companies
                this.services = _.flatMap(companies, (c) => c.services)
            })
            .catch(error => this.error = error);
    }

    doEdit(company: Company) {
        this.company = _.cloneDeep(company)
        this.modal.open(this.modalSize)
    }
    //
    doAdd() {
        this.isAddNewOpt = true
        this.modal.open(this.modalSize)
    }

    onDismiss(event) {
        this.clear()
    }
    //
    private clear() {
        this.isAddNewOpt = false
        this.company = new Company()
    }
}