import { NgModule } from '@angular/core';

import { SheetListRoutingModule } from './sheet-list-routing.module';
import { SharesModule } from 'src/app/shares/shares.module';
import { SheetListComponent } from './sheet-list.component';


@NgModule({
  declarations: [SheetListComponent],
  imports: [
    SharesModule,
    SheetListRoutingModule
  ]
})
export class SheetListModule { }
