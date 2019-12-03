import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { Banner, HotTag, SongSheet } from './data-types/common.types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: ServicesModule
})
export class HomeService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string
  ) { }

  getBanner(): Observable<Banner[]> {
    return this.http.get(this.url + 'banner')
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }

  getHotTags(): Observable<Array<HotTag>> {
    return this.http.get(this.url + 'playlist/hot')
      .pipe(map((res: { tags: Array<HotTag> }) => {
        return res.tags.sort((x: HotTag, y: HotTag) => x.position - y.position).slice(0, 5);
      }));
  }

  getPersonalSheetList(): Observable<Array<SongSheet>> {
    return this.http.get(`${this.url}personalized`)
      .pipe(map((res: { result: Array<SongSheet> }) => res.result.slice(0, 16)));
  }
}
