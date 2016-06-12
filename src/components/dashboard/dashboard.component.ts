/**
 * Component DashboardComponent
 */

import {Component, OnInit} from 'angular2/core';
import {RegionsService, Region} from '../../shared/services/src/regions.service'

@Component({
    selector: 'dashboard',
    moduleId: module.id,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    regions: Region[];
    error: Error;


    constructor(private regionsService:RegionsService) {
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
}