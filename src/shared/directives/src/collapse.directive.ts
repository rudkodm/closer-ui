/**
 * Directive CollapseDirective
 */
import {Directive, ElementRef, HostListener, Input} from 'angular2/core';
@Directive({
    selector: '[collapsible]'
})
export class CollapseDirective {

    private collapsed = false;
    private el:HTMLElement;

    constructor(el:ElementRef) {
        this.el = el.nativeElement;
    }

    @HostListener('click') onClick() {
        (this.collapsed) ? this.show() : this.hide();
    }

    @Input("collapsedByDefault") set collapsedByDefault(shouldBeCollapsed: boolean) {
        if(shouldBeCollapsed) this.hide()
    }

    private hide() {
        this.collapsed = true;
        this.el.className += "collapsed";
    }

    private show() {
        this.collapsed = false;
        this.el.className = this.el.className.replace("collapsed", "");
    }
}