import { Injectable } from '@angular/core';
import { AppStoreModule } from '.';
import { PlayState } from './reducers/play.reducer';
import { Store, select } from '@ngrx/store';
import { Song } from '../services/data-types/common.types';
import { SetSongList, SetPlayList, SetCurrentIndex } from './actions/player.action';
import { shuffle, findIndex } from '../utils/array';

@Injectable({
  providedIn: AppStoreModule
})
export class BatchActionService {

  private playerState: PlayState;

  constructor(
    private store$: Store<AppStoreModule>
  ) { 
    this.store$.pipe(select('player')).subscribe(res => this.playerState= res);
  }

  // 播放列表
  selectPlayList({list, index}:{list: Array<Song>, index: number}){
    this.store$.dispatch(SetSongList({songList: list}));

      let trueIndex = 0;
      let trueList = list.slice();

      if(this.playerState.playMode.type === 'random'){
        trueList = shuffle(list || []);
        trueIndex = findIndex(trueList, list[trueIndex]);
      }

      this.store$.dispatch(SetPlayList({playList: trueList}));
      this.store$.dispatch(SetCurrentIndex({currentIndex: trueIndex}));
  }

   // 删除歌曲
   deleteSong(song: Song) {
    const songList = this.playerState.songList.slice();
    const playList = this.playerState.playList.slice();
    let currentIndex = this.playerState.currentIndex;
    const sIndex = findIndex(songList, song);
    songList.splice(sIndex, 1);
    const pIndex = findIndex(playList, song);
    playList.splice(pIndex, 1);

    if (currentIndex > pIndex || currentIndex === playList.length) {
      currentIndex--;
    }

    this.store$.dispatch(SetSongList({ songList }));
    this.store$.dispatch(SetPlayList({ playList }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex }));
  }

  // 清空歌曲
  clearSong() {
    this.store$.dispatch(SetSongList({ songList: [] }));
    this.store$.dispatch(SetPlayList({ playList: [] }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: -1 }));
  }
}
