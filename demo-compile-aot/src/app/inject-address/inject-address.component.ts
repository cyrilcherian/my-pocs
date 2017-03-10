import { Component, OnInit } from '@angular/core';
import { AddressService } from '../core/address/address.service';

@Component({
  selector: 'app-inject-address',
  templateUrl: './inject-address.component.html',
  styleUrls: ['./inject-address.component.css']
})
export class InjectAddressComponent implements OnInit {
  content: string;
  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.addressService.getHTML().subscribe(data => {
        this.content = data as string;
        console.log(this.content);
    });
  }
}
