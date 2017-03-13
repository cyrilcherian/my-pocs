import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SlotComponent } from './slot/slot.component';
import { SlotLinklistComponent } from './slot-linklist/slot-linklist.component';
import { SlotLinkComponent } from './slot-link/slot-link.component';
import { SlotImagelistComponent } from './slot-imagelist/slot-imagelist.component';
import { SlotImageComponent } from './slot-image/slot-image.component';
import { HtmlService } from './core/html.service';

@NgModule({
  declarations: [
    AppComponent,
    SlotComponent,
    SlotLinklistComponent,
    SlotLinkComponent,
    SlotImagelistComponent,
    SlotImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HtmlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
