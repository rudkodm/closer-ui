import {Directive, ElementRef, HostListener, Input} from '@angular/core';
@Directive({
    selector: '[collapsible]'
})
export class CollapseDirective {

    private el:HTMLElement;
    collapsed = false;

    constructor(el:ElementRef) {
        this.el = el.nativeElement;
    }

    @HostListener('click') onClick() {
        (this.collapsed) ? this.show() : this.hide();
    }

    @Input() set collapsedByDefault(collapsedByDefault: boolean) {
        if(collapsedByDefault) this.hide()
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