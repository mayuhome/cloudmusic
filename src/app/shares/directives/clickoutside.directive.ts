import { Directive, Input, Output, EventEmitter, ElementRef, Renderer2, OnChanges, inject, Inject, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective implements OnChanges {

  private handleClick: () =>void;

  @Input() bindFlag = false;
  @Output() onClickOutside = new EventEmitter<void>();

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    @Inject(DOCUMENT) private doc: Document
    ) { }

    ngOnChanges(c: SimpleChanges){
      if(c['bindFlag'] && !c['bindFlag'].firstChange){
        if(this.bindFlag){
          this.handleClick = this.rd.listen(this.doc, 'click', evt => {
            const isContain = this.el.nativeElement.contains(evt.target);
            if(!isContain){
              this.onClickOutside.emit();
            }
          });
        }else{
          this.handleClick();
        }
      }
    }
}
