import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  carouselActiveIndex = 0;
  banners: Array<Banner>;

  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: NzCarouselComponent;

  constructor(
    private homeServe: HomeService
  ) {
    this.homeServe.getBanner().subscribe(banners => {
      this.banners = banners;
    });
  }

  ngOnInit() {
  }

  onBeforeChange({to}){
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre'|'next'){
    this.nzCarousel[type]();
  }
}
