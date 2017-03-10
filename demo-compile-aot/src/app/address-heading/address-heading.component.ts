import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-heading',
  templateUrl: './address-heading.component.html',
  styleUrls: ['./address-heading.component.css']
})
export class AddressHeadingComponent implements OnInit {
  errorCount = -10;
  constructor() { }

  ngOnInit() {

  }

  doClick(){
    console.log("hello you clicked");
  }
}
