import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slot-link',
  templateUrl: './slot-link.component.html',
  styleUrls: ['./slot-link.component.css']
})
export class SlotLinkComponent implements OnInit {
  @Input() slotlink = {};
  constructor() { }

  ngOnInit() {
    console.log(this.slotlink)
  }

}
