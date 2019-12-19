import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { IWySliderStyle } from './wy-slider-types';

@Component({
  selector: 'app-wy-slider-handle',
  template: `<div class="wy-slider-handle" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderHandleComponent implements OnInit, OnChanges {

  @Input() wyVertical = false;
  @Input() wyOffset: number;

  style: IWySliderStyle = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(c: SimpleChanges){
    if(c['wyOffset']){
      this.style[this.wyVertical?'bottom':'left'] = `${this.wyOffset}%`;
    }
  }
}
