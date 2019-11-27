import { NgModule, SkipSelf, Optional } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import { SharesModule } from '../shares/shares.module';
import { ServicesModule } from '../services/services.module';
import { PagesModule } from '../pages/pages.module';

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    PagesModule,
    SharesModule,
    ServicesModule
  ],
  exports: [
    SharesModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() core: CoreModule) {
    if (core) {
      throw new Error('CoreModule 只能内 appModule引入!');
    }
  }
}
