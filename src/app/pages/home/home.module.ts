import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharesModule } from 'src/app/shares/shares.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharesModule,
    HomeRoutingModule,
  ],
})
export class HomeModule { }
