import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({ selector: '[pinkbitsProductSearch]' })
export class ProductSearchDirective implements OnChanges {
    @Input() searchedWord: string; // searchText
    @Input() content: string; // HTML content
    @Input() classToApply: string; //class to apply for highlighting
    @Input() setTitle = false; //sets title attribute of HTML

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.content) {
            return;
        }
        if (this.setTitle) {
            this.renderer.setProperty(this.el.nativeElement, 'title', this.content);
        }
        if (!this.searchedWord || !this.searchedWord.length || !this.classToApply) {
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.content);
            return;
        }
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.getFormattedText());
    }
    getFormattedText() {
        const re = new RegExp(`(${this.searchedWord})`, 'gi');
        return this.content.replace(re, `<span class="${this.classToApply}">$1</span>`);
      }
}
