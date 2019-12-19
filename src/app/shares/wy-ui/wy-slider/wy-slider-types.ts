import { Observable } from 'rxjs';

export interface IWySliderStyle {
    width?: string|null;
    height?: string|null;
    left?: string|null;
    bottm?: string|null;
}

export interface SliderEventObserverConfig {
    start: string;
    move: string;
    end: string;
    filter: (e:Event) => boolean;
    pluckKey: Array<string>;
    startPlucked$?: Observable<number>;
    moveResolved$?: Observable<number>;
    end$?: Observable<Event>;
}

export type SliderValue = number | null;