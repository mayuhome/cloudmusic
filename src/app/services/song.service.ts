import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { Singer, SongSheet, Song, SongUrl } from './data-types/common.types';


@Injectable({
  providedIn: ServicesModule
})
export class SongService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string,
    // private songServe: songser
  ) { }

  getSongUrl(ids: string): Observable<Array<SongUrl>>{
    const params = new HttpParams().set('id', ids);
    return this.http.get(this.uri + 'song/url', {params})
    .pipe(map((res:{data: Array<SongUrl>}) => res.data));
  }

  getSongList(songs: Song | Array<Song>): Observable<Array<Song>>{
    const songArr = Array.isArray(songs)?songs.slice():[songs];
    const ids = songArr.map(item => item.id).join(',');
    return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls))); 
  }

  private generateSongList(songs: Array<Song>, urls: Array<SongUrl>): Array<Song> {
    const result = [];
    songs.forEach(song => {
      const url = urls.find(url => url.id === song.id).url;
      if(url){
        result.push({...song, url});
      }
    });
    console.log('result:', result);
    return result;
  }
}
