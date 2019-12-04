import { Injectable } from '@angular/core';
import { HomeModule } from './home.module';
import { Resolve } from '@angular/router';
import { Banner, HotTag, SongSheet, Singer } from 'src/app/services/data-types/common.types';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';
import { Observable, forkJoin } from 'rxjs';
import { take, first } from 'rxjs/operators';

// declare interface IHomeData {
//   banners: Array<Banner>;
//   hotTags: Array<HotTag>;
//   songSheets: Array<SongSheet>;
//   singers: Array<Singer>;
// }

declare type HomeData = [Array<Banner>, Array<HotTag>, Array<SongSheet>, Array<Singer>];

@Injectable()
export class HomeResolveService implements Resolve<HomeData> {
  constructor(
    private homeServe: HomeService,
    private singerServe: SingerService,
  ) { }

  resolve(): Observable<HomeData> {
   return forkJoin([
      this.homeServe.getBanner(),
      this.homeServe.getHotTags(),
      this.homeServe.getPersonalSheetList(),
      this.singerServe.getEnterSigner()
    ]).pipe(first());
  }

}
