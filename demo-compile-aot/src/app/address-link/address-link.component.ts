import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-address-link',
  templateUrl: './address-link.component.html',
  styleUrls: ['./address-link.component.css']
})
export class AddressLinkComponent implements OnInit {
  @Input('name') name;
  nameCalc = "";
  constructor(elementRef:ElementRef) {
    console.log(elementRef.nativeElement.getAttribute('name'));
    this.nameCalc = elementRef.nativeElement.getAttribute('name');
  }

  ngOnInit() {
    console.log(this.name, "meeeeee", this.nameCalc);
  }

}
