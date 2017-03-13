import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slot-image',
  templateUrl: './slot-image.component.html',
  styleUrls: ['./slot-image.component.css']
})
export class SlotImageComponent implements OnInit {
  @Input() imagelink;
  constructor() { }

  ngOnInit() {
  }

}
