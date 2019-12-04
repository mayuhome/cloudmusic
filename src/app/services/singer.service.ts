import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Singer } from './data-types/common.types';


interface SingerParams {
  offset: number;
  limit: number;
  cat?: string;
}

const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
};

@Injectable({
  providedIn: ServicesModule
})
export class SingerService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private uri: string
  ) { }

  getEnterSigner(args: SingerParams = defaultParams): Observable<Array<Singer>> {
    const params = new HttpParams({fromString: JSON.stringify(args)});
    return this.http.get(`${this.uri}artist/list`, {params})
    .pipe(map((res: {artists: Array<Singer>}) => res.artists));
  }
}
