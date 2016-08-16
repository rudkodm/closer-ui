import {Component, OnInit, ViewChild} from '@angular/core';
import {RegionsService, Region} from '../../shared/services/src/regions.service'
import { MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal'

@Component({
    selector: 'regions',
    moduleId: module.id,
    templateUrl: './regions.component.html',
    styleUrls: ['./regions.component.css'],
    directives: [MODAL_DIRECTIVES]
})
export class RegionsComponent implements OnInit {
    regions: Region[]
    region: Region = new Region()
    error: Error

    @ViewChild('regionModal') modal: ModalComponent;

    constructor(private regionsService:RegionsService) {
    }

    ngOnInit() {
        this.getRegions()
    }

    getRegions() {
        this.regionsService
            .getRegions()
            .then(regions => this.regions = regions)
            .catch(error => this.error = error);
    }

    findRegionWithId(regionId: HTMLInputElement) {
        this.regionsService.getRegionById(regionId.value).then(region => {
            this.region = region
        });
        regionId.value = null
    }



    submit() {
        if(this.region.id) {
            this.regionsService.update(this.region)
        } else {
            this.regionsService.save(this.region)
        }
    }

    edit(region: Region) {
        this.region = region
        this.modal.open('lg')
    }

    onDismiss(event) {
        this.clear()
    }

    onClose(event) {
        this.clear()
    }

    onOpen(event) {
    }

    clear() {
        this.region = new Region()
    }
}
