import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner, HotTag, SongSheet } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';

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

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    private homeServe: HomeService
  ) {
    this.getBanners();
    this.getHotTags();
    this.getSongSheets();

  }

  private getBanners() {
    this.homeServe.getBanner().subscribe(banners => {
      this.banners = banners;
    });
  }
  private getHotTags() {
    this.homeServe.getHotTags().subscribe(tags => {
      console.log('tags:', tags);
      this.hotTags = tags;
    });
  }
  private getSongSheets() {
    this.homeServe.getPersonalSheetList().subscribe(sheets => {
      console.log('sheets:', sheets);
      this.songSheets = sheets;
    });
  }

  ngOnInit() {
  }

  onBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }
}
