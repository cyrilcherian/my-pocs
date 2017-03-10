import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OnMount, DynamicHTMLModule } from 'ng-dynamic';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnMount {

  @ViewChild('innerContent') innerContent: ElementRef;
  constructor() { }

  ngOnInit() { }

  dynamicOnMount(attr: Map<string, string>, innerHTML: string, el: any) {
    console.log("yes called", innerHTML);
    this.innerContent.nativeElement.innerHTML = innerHTML;
  }


}
