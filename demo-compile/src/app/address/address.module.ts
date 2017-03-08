import {AddressComponent} from "./address.component";
import {
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';

@NgModule({
    declarations: [AddressComponent],
    imports: [BrowserModule, ReactiveFormsModule, FormsModule],
    exports: [AddressComponent]
})
export class AddressModule {}
