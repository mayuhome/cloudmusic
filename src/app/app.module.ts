
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { GetnameComponent } from './getname/getname.component';



@NgModule({
  declarations: [
    AppComponent,
    GetnameComponent
  ],
  imports: [
    CoreModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
