import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DynamicHTMLModule } from 'ng-dynamic';
import { AppComponent } from './app.component';
import { AddressComponent } from './address/address.component';
import { InjectAddressComponent } from './inject-address/inject-address.component';
import { AddressService } from './core/address/address.service';

@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    InjectAddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DynamicHTMLModule.forRoot({
      components: [
        { component: AddressComponent, selector: 'app-address' },
      ]
    })
  ],
  providers: [AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
