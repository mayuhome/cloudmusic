import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, fromEvent, merge } from 'rxjs';
import { SliderEventObserverConfig } from './wy-slider-types';
import { take, tap, filter, pluck, map, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { sliderEvent, getElementOffset } from './wy-slider-helper';
import { inArray } from 'src/app/utils/array';
import { limitNumberInRange } from 'src/app/utils/number';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderComponent implements OnInit {

  @Input() wyVertical = false;
  @Input() wyMin = 0;
  @Input() wyMax = 100;

  @ViewChild('wySlider', {static: true}) private wySlider: ElementRef;

  private sliderDom: HTMLElement;
  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) { }

  ngOnInit() {
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
    this.subscribeDrag(['start']);
  }

  private createDraggingObservables(){
    const orientField = this.wyVertical?'pageY':'pageX';
    const mouse:SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField]
    };
    const touch: SliderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touchs', '0', orientField]
    };
    [mouse, touch].forEach(source => {
      const { start, move, end, filter:f, pluckKey} = source;
      source.startPlucked$ = fromEvent(this.sliderDom, start)
      .pipe(
        filter(f),
        tap(sliderEvent),
        pluck(...pluckKey),
        map((position: number) => this.findClosestValue(position))
      );

      source.end$ = fromEvent(this.doc, end);
      source.moveResolved$ = fromEvent(this.doc, move)
      .pipe(
        filter(f),
        tap(sliderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position: number)=> this.findClosestValue(position)),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$),
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }

  private subscribeDrag(events: Array<string> = ['start', 'move', 'end']){
    if(inArray(events, 'start') && this.dragStart$){
      this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if(inArray(events, 'move') && this.dragMove$){
      this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if(inArray(events, 'end') && this.dragEnd$){
      this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private onDragStart(value: number){
    console.log('value:', value);
  }
  private onDragMove(value: number){

  }
  private onDragEnd(){

  }

  private findClosestValue(position: number): number{
    // 获取滑块总长
    const sliderLength = this.getSliderLength();
    // 滑块(左,上)端点位置
    const sliderStart = this.getSliderStartPosition();
    // 滑块当前位置 / 滑块总长
    const ratio = limitNumberInRange((position - sliderLength)/sliderLength, 0, 1);
    const ratioFix = this.wyVertical? 1- ratio:ratio;
    return ratioFix * (this.wyMax - this.wyMin) + this.wyMin;
  }

  private getSliderLength(): number{
    return this.wyVertical?this.sliderDom.clientHeight:this.sliderDom.clientWidth;
  }

  private getSliderStartPosition(): number{
    const offset = getElementOffset(this.sliderDom);
    return this.wyVertical?offset.top:offset.left;
  }
}
