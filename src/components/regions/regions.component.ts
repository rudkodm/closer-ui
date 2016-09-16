import {Component, OnInit, ViewChild} from '@angular/core';
import {RegionsService} from '../../shared/services/src/regions.service'
import {ModalComponent} from 'ng2-bs4-modal/ng2-bs4-modal'
import {Region, Zone} from "../../shared/model";
import {Utils} from "../../shared/helpers/response.helpers";
import {RegionFormComponent} from "../region-form/region-form.component";

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

    @ViewChild(RegionFormComponent)
    form: RegionFormComponent;

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
            .then(region => Utils.replaceWith(this.regions, region))
            .catch(error => this.error = error)
    }

    doEdit(region: Region) {
        this.region = Utils.clone(region);
        this.modal.open(this.modalSize);
    }

    doAdd() {
        this.isAddNewOpt = true;
        this.modal.open(this.modalSize);
    }

    doDelete() {
        this.regionsService
            .delete(this.region)
            .catch(error => this.error = error);
        Utils.removeObject(this.regions, this.region);
        this.modal.close()
    }

    onDismiss(event) {
        this.clear()
    }

    onClose(event) {
        this.clear()
    }

    onOpen(event) {
        this.form.show()
    }

    private clear() {
        this.isAddNewOpt = false;
        this.region = this.defaultRegion();
        this.form.hide()
    }

    private defaultRegion(): Region {
        let region = new Region();
        // Set BigBen as a default. Later User IP can be used
        region.zone = new Zone(51.500390404939786, -0.12429392429589825, 50);
        return region;
    }
}
