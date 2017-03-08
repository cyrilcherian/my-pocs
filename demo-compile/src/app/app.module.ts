import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AddressModule } from './address/address.module';
import { AddressService } from './core/address/address.service';
import { InjectAddressComponent } from './inject-address/inject-address.component'

@NgModule({
  declarations: [
    AppComponent,
    InjectAddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AddressModule
  ],
  providers: [AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
