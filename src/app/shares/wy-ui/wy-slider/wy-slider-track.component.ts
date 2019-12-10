import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { IWySliderStyle } from './wy-slider-types';

@Component({
  selector: 'app-wy-slider-track',
  template: `<div class="wy-slider-track" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderTrackComponent implements OnInit, OnChanges {

  @Input() wyVertical = false;
  @Input() wyLength: number;

  style: IWySliderStyle;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(c: SimpleChanges){
    if(c['wyLength']){
      if(this.wyVertical){
        this.style.height = `${this.wyLength}%`;
        this.style.left = null;
        this.style.width = null;
      }else{
        this.style.width = `${this.wyLength}%`;
        this.style.bottm = null;
        this.style.height = null;
      }
    }
  }
}
