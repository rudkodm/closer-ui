import {Component, OnInit} from '@angular/core';
import {RegionsService, Region} from '../../shared/services/src/regions.service'

@Component({
    selector: 'regions',
    moduleId: module.id,
    templateUrl: './regions.component.html',
    styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
    region: Region = new Region()
    error: Error

    constructor(private regionsService:RegionsService) {
    }

    ngOnInit() {
    }

    findRegionWithId(regionId: HTMLInputElement) {
        this.regionsService.getRegionById(regionId.value).then(region => {
            this.region = region
        });
        regionId.value = null
    }

    clear() {
        this.region = new Region()
    }

    submit() {
        if(this.region.id) {
            this.regionsService.update(this.region)
        } else {
            this.regionsService.save(this.region)
        }
    }
}