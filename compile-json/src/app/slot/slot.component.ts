import { Component, OnInit } from '@angular/core';
import {HtmlService} from '../core/html.service';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  constructor(private htmlService: HtmlService) { }
  html : any = {};
  ngOnInit() {
    this.htmlService.html().subscribe(data => {
        this.html = data;
        console.log(this.html)
    });
  }
  getKey(ob){
    console.log(Object.keys(ob)[0]);
    return Object.keys(ob)[0];
  }

}
