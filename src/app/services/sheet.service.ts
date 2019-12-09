import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { Singer, SongSheet, Song } from './data-types/common.types';
import { SongService } from './song.service';


@Injectable({
  providedIn: ServicesModule
})
export class SheetService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
    private songServe: SongService
  ) { }

getSongSheetDetail(id: number){
  const parma = new HttpParams().set('id', id.toString());
  return this.http.get(`${this.uri}playlist/detail`, {params: parma})
  .pipe(map((res: {playlist: SongSheet}) => res.playlist));
}

playSheet(id: number): Observable<Array<Song>>{
  return this.getSongSheetDetail(id)
  .pipe(pluck('tracks'), switchMap(tracks => this.songServe.getSongList(tracks)));
}
}
