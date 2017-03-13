import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BarchartComponent } from './barchart/barchart.component';
import { BarService } from "./core/bar.service";

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ BarService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
