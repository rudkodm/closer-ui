import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/src/auth.service";

@Component({
    selector: 'header',
    templateUrl: 'components/header/header.component.html',
    styleUrls: ['components/header/header.component.css']
})
export class HeaderComponent {
    constructor(private auth: AuthService) {}
}