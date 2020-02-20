import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner, HotTag, SongSheet, Singer } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { SheetService } from 'src/app/services/sheet.service';
import { BatchActionService } from 'src/app/store/batch-action.service';

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

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    private sheetServe: SheetService,
    private route: ActivatedRoute,
    private batchActionsServe: BatchActionService
  ) {
    this.route.data.pipe(map(res => res.homeData)).subscribe(([banners, hotTags, songSheets, singers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheets = songSheets;
      this.singers = singers;
    })
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
      this.batchActionsServe.selectPlayList({list, index: 0});
    });
  }
}
