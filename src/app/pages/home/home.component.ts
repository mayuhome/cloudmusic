import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner, HotTag, SongSheet, Singer } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { SingerService } from 'src/app/services/singer.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { SheetService } from 'src/app/services/sheet.service';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { SetSongList, SetPlayList, SetCurrentIndex } from 'src/app/store/actions/player.action';
import { PlayState } from 'src/app/store/reducers/play.reducer';
import { shuffle, findIndex } from 'src/app/utils/array';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  carouselActiveIndex = 0;
  banners: Array<Banner>;
  hotTags: Array<HotTag>;
  songSheets: Array<SongSheet>;
  singers: Array<Singer>;

  private playerState: PlayState;

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    private sheetServe: SheetService,
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>
  ) {
    this.route.data.pipe(map(res => res.homeData)).subscribe(([banners, hotTags, songSheets, singers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheets = songSheets;
      this.singers = singers;
    })
    
    this.store$.pipe(select('player')).subscribe(res => this.playerState = res);

  }

  

  ngOnInit() {
  }

  onBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  onPlaySheet(id: number){
    console.log('id:', id);
    this.sheetServe.playSheet(id).subscribe(list => {
      this.store$.dispatch(SetSongList({songList: list}));

      let trueIndex = 0;
      let trueList = list.slice();

      if(this.playerState.playMode.type === 'random'){
        trueList = shuffle(list || []);
        trueIndex = findIndex(trueList, list[trueIndex]);
      }

      this.store$.dispatch(SetPlayList({playList: trueList}));
      this.store$.dispatch(SetCurrentIndex({currentIndex: trueIndex}));
    });
  }
}
