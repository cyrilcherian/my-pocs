import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DynamicHTMLModule } from 'ng-dynamic';
import { AppComponent } from './app.component';
import { AddressComponent } from './address/address.component';
import { InjectAddressComponent } from './inject-address/inject-address.component';
import { AddressService } from './core/address/address.service';
import { AddressLinkComponent } from './address-link/address-link.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    InjectAddressComponent,
    AddressLinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DynamicHTMLModule.forRoot({
      components: [
        { component: AddressComponent, selector: 'app-address' },
        { component: AddressLinkComponent, selector: 'app-address-link' },
      ]
    })
  ],
  providers: [AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
