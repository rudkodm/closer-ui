import {Component, OnInit, ViewChild} from "@angular/core";
import {CompaniesService} from "../../shared/services/src/companies.service";
import {Company, AddressDetails, ContactDetails, ServiceProvider} from "../../shared/model";
import {ModalComponent} from "ng2-bs4-modal/ng2-bs4-modal";
import * as _ from "lodash";

@Component({
    selector: 'companies',
    templateUrl: '/components/companies/companies.component.html',
    styleUrls : ['/components/companies/companies.component.css']
})
export class CompaniesComponent implements OnInit{
    companies: Company[];
    services: ServiceProvider[];
    company: Company = new Company();
    error: Error;
    isAddNewOpt: Boolean = false;

    @ViewChild('companyModal')
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

    // doSave() {
    //     function saveOpt() {
    //         this.regionsService
    //             .save(this.region)
    //             .then(region => this.regions.push(region))
    //             .catch(error => this.error = error)
    //     }
    //
    //     function updateOpt() {
    //         this.regionsService
    //             .update(this.region)
    //             .then(region => {
    //                 this.replaceWith(this.regions, region);
    //             })
    //             .catch(error => this.error = error)
    //     }
    //
    //     if (this.isAddNewOpt) {
    //         saveOpt.call(this);
    //     } else {
    //         updateOpt.call(this);
    //     }
    //     this.clear()
    //     this.modal.close()
    // }
    //
    // private replaceWith(regions: Region[], region: Region) {
    //     let index = this.findPosition(region)
    //     regions.splice(index, 1, region)
    // }
    //
    doEdit(company: Company) {
        this.company = _.cloneDeep(company)
        this.modal.open(this.modalSize)
    }
    //
    doAdd() {
        this.isAddNewOpt = true
        this.modal.open(this.modalSize)
    }
    //
    // doDelete() {
    //     this.regionsService
    //         .delete(this.region)
    //         .catch(error  => this.error = error)
    //
    //     this.removeRegion(this.regions, this.region)
    //     this.modal.close()
    // }
    //
    // private removeRegion(regions: Region[], region: Region) {
    //     let index = this.findPosition(region)
    //     regions.splice(index, 1)
    // }
    //
    onDismiss(event) {
        this.clear()
    }
    //
    private clear() {
        this.isAddNewOpt = false
        this.company = new Company()
    }
    //
    // private findPosition(region: Region) {
    //     return this.regions.findIndex(r => r.id === region.id);
    // }
}

export class ServicesDetails {
    companyId: string;
    companyName: string;
    companyDescription: string;
    companyContactDetails: ContactDetails;
    serviceId: string;
    regionId: string;
    businessCategory: string;
    addressDetails: AddressDetails;
    contactDetails: ContactDetails;
}