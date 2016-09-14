import {Component, OnInit, ViewChild} from '@angular/core';
import {RegionsService} from '../../shared/services/src/regions.service'
import {ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal'
import {Region, Location, Zone} from "../../shared/model";
import { SebmGoogleMap} from 'angular2-google-maps/core';
import * as _ from 'lodash'

@Component({
    selector: 'regions',
    templateUrl: 'components/regions/regions.component.html',
    styleUrls: ['components/regions/regions.component.css']
})
export class RegionsComponent implements OnInit {
    regions: Region[];
    region: Region;

    error: Error;
    isAddNewOpt: Boolean = false;

    @ViewChild(ModalComponent)
    modal: ModalComponent;
    modalSize = 'lg';
    modalIsOpen: boolean = false;

    @ViewChild(SebmGoogleMap)
    map: SebmGoogleMap;

    constructor(private regionsService: RegionsService) {
    }

    ngOnInit() {
        this.regionsService.getRegions()
            .then(regions => this.regions = regions)
            .catch(error => this.error = error);
        this.region = this.defaultRegion();
    }

    doSave() {
        if (this.isAddNewOpt) this.saveOpt();
        else this.updateOpt();

        this.modal.close()
    }

    private saveOpt() {
        this.regionsService
            .save(this.region)
            .then(region => this.regions.push(region))
            .catch(error => this.error = error)
    }

    private updateOpt() {
        this.regionsService
            .update(this.region)
            .then(region => {
                this.replaceWith(this.regions, region);
            })
            .catch(error => this.error = error)
    }

    private replaceWith(regions: Region[], region: Region) {
        let index = this.findRegionPosition(region);
        regions.splice(index, 1, region);
    }

    doEdit(region: Region) {
        this.region = _.cloneDeep(region);
        this.modal.open(this.modalSize);
    }

    doAdd() {
        this.isAddNewOpt = true;
        this.modal.open(this.modalSize);
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

    private findRegionPosition(region: Region): number {
        return this.regions.findIndex(r => r.id === region.id);
    }

    onDismiss(event) {
        this.clear()
    }

    onClose(event) {
        this.clear()
    }

    onOpen(event){
        this.modalIsOpen = true;
        setTimeout(() => {
            this.map.triggerResize()
        })
    }

    onCenterChange(center: Location, point ) {
        center.latitude = point.lat;
        center.longitude = point.lng;
    }

    onRadiusChange(zone: Zone, radius) {
        zone.radius = radius
    }

    private clear() {
        this.modalIsOpen = false;
        this.isAddNewOpt = false;
        this.region = this.defaultRegion();
        this.map.triggerResize();
    }

    private defaultRegion(): Region {
        let region = new Region();
        // Set BigBen as a default. Later User IP can be used
        region.zone = new Zone(51.500390404939786, -0.12429392429589825, 50);
        return region;
    }
}
