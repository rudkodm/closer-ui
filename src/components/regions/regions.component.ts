import {Component, OnInit} from 'angular2/core';
import {RegionsService, Region} from '../../shared/services/src/regions.service'
import {PromotionsService, Promotion} from "../../shared/services/src/promotions.service";

@Component({
    selector: 'dashboard',
    moduleId: module.id,
    templateUrl: './regions.component.html',
    styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
    regions: Region[];
    promotions: Promotion[] = [];
    error: Error;


    constructor(private regionsService:RegionsService, private promotionsService: PromotionsService) {
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

    gotoPromotions(r: Region) {
        this.promotionsService
            .getPromotionsOf(r.id)
            .then(promotions => this.promotions = promotions)
            .catch(error => this.error = error);
    }
}