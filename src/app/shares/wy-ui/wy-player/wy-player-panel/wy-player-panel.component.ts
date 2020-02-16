import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { Song } from 'src/app/services/data-types/common.types';
import { WyScrollComponent } from '../wy-scroll/wy-scroll.component';
import { findIndex } from 'src/app/utils/array';
import { SongService } from 'src/app/services/song.service';
import { WyLyric, BaseLyricLine } from './wy-lyric';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit, OnChanges {

  scrollY = 0;
  currentLyric: Array<BaseLyricLine>;

  @Input() songList: Array<Song>;
  @Input() currentSong: Song;
  currentIndex: number;
  @Input() show: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() onChangeSong = new EventEmitter<Song>();

  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent>;

  constructor(
    private songServ: SongService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['songList']){
      console.log('songList:', this.songList);
      this.currentIndex = 0;
    }
    if(changes['currentSong']){
      if(this.currentSong){
        this.currentIndex =  findIndex(this.songList, this.currentSong);
        this.updateLyric();
        if(this.show){
          this.scrollToCurrent();
        }
      }
    }
    if(changes['show']){
      if(!changes['show'].firstChange && this.show){
        this.wyScroll.first.refreshScroll();
      }
    }
  }


  private updateLyric(){
  this.songServ.getLyric(this.currentSong.id).subscribe(res => {
    const lyric = new WyLyric(res);
    console.log('lyric:', lyric);
    this.currentLyric = lyric.lines;
  });
  }

  private scrollToCurrent(speed = 300){
    const songListRefs = this.wyScroll.first.el.nativeElement.querySelectorAll('ul li');
    if(songListRefs.length){
      const currentLi = <HTMLElement>songListRefs[this.currentIndex || 0];
      const offsetTop = currentLi.offsetTop;
      const offsetHeight = currentLi.offsetHeight;
      if(((offsetTop - Math.abs(this.scrollY))>offsetHeight*5) || (offsetTop<Math.abs(this.scrollY))){
        this.wyScroll.first.scrollToElement(currentLi, speed, false, false);
      }
    }
  }
}