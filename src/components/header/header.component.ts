import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'header',
    moduleId: module.id,
    templateUrl: '/components/header/header.component.html',
    styleUrls: ['/components/header/header.component.css'],
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export class HeaderComponent {
}