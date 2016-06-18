import {Component, OnInit} from 'angular2/core';
import {RegionsService, Region} from '../../shared/services/src/regions.service'
import {PromotionsService, Promotion} from "../../shared/services/src/promotions.service";
import {CollapseDirective} from "../../shared/directives/src/collapse.directive";

@Component({
    selector: 'dashboard',
    moduleId: module.id,
    templateUrl: './dashboard.component.html',
    styleUrls : ['./dashboard.component.css'],
    directives: [CollapseDirective]
})
export class DashboardComponent implements OnInit {
    regions:Region[];
    selectedRegion:Region;
    selectedPromotions:Promotion[];
    error:Error;


    constructor(private regionsService:RegionsService, private promotionsService:PromotionsService) {
    }

    ngOnInit() {
        this.getRegions();
    }

    getRegions() {
        this.regionsService
            .getRegions()
            .then(regions => this.regions = regions)
            .catch(error => this.error = error);
    }

    selectRegion(r:Region) {
        this.selectedRegion = r;
        this.promotionsService
            .getPromotionsOf(r.id)
            .then(promotions => this.selectedPromotions = promotions)
            .catch(error => this.error = error);
    }

    close() {
        this.selectedRegion = null;
        this.selectedPromotions = null;
    }
}