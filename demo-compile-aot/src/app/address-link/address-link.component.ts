import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-address-link',
  templateUrl: './address-link.component.html',
  styleUrls: ['./address-link.component.css']
})
export class AddressLinkComponent implements OnInit {
  @Input() name: string = ""
  constructor() { }

  ngOnInit() {
  }

}
