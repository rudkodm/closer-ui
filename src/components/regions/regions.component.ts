import {Component, OnInit, ViewChild} from '@angular/core';
import {RegionsService} from '../../shared/services/src/regions.service'
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal'
import * as _ from 'lodash'
import {Region} from "../../shared/model";

@Component({
    selector: 'regions',
    moduleId: module.id,
    templateUrl: './regions.component.html',
    styleUrls: ['./regions.component.css'],
    directives: [MODAL_DIRECTIVES]
})
export class RegionsComponent implements OnInit {
    regions: Region[];
    region: Region = new Region();
    error: Error;
    isAddNewOpt: Boolean = false;

    @ViewChild('modal')
    modal: ModalComponent;
    modalSize = 'lg';

    constructor(private regionsService: RegionsService) {
    }

    ngOnInit() {
        this.getRegions()
    }

    private getRegions() {
        this.regionsService
            .getRegions()
            .then(regions => this.regions = regions)
            .catch(error => this.error = error);
    }

    doSave() {
        function saveOpt() {
            this.regionsService
                .save(this.region)
                .then(region => this.regions.push(region))
                .catch(error => this.error = error)
        }

        function updateOpt() {
            this.regionsService
                .update(this.region)
                .then(region => {
                    this.replaceWith(this.regions, region);
                })
                .catch(error => this.error = error)
        }

        if (this.isAddNewOpt) {
            saveOpt.call(this);
        } else {
            updateOpt.call(this);
        }
        this.clear()
        this.modal.close()
    }

    private replaceWith(regions: Region[], region: Region) {
        let index = this.findRegionPosition(region)
        regions.splice(index, 1, region)
    }

    doEdit(region: Region) {
        this.region = _.cloneDeep(region)
        this.modal.open(this.modalSize)
    }

    doAdd() {
        this.isAddNewOpt = true
        this.modal.open(this.modalSize)
    }

    doDelete() {
        this.regionsService
            .delete(this.region)
            .catch(error  => this.error = error)

        this.removeRegion(this.regions, this.region)
        this.modal.close()
    }

    private removeRegion(regions: Region[], region: Region) {
        let index = this.findRegionPosition(region)
        regions.splice(index, 1)
    }

    onDismiss(event) {
        this.clear()
    }

    private clear() {
        this.isAddNewOpt = false
        this.region = new Region()
    }

    private findRegionPosition(region: Region) {
        return this.regions.findIndex(r => r.id === region.id);
    }
}
