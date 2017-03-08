import { Component, OnInit  } from '@angular/core';
import { AddressService } from "./core/address/address.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  name = 'Cyril Cherian';
  constructor(private addressService: AddressService) {

  }
  ngOnInit(){
  }
}
