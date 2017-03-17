import { Component, OnInit } from '@angular/core';
declare var L: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    L.mapbox.accessToken = 'pk.eyJ1IjoiY3lyaWxjaGVyaWFuIiwiYSI6IjJXaW1uaFEifQ.O0934gS95pspH4Tax0wpIg';
    var mapLeaflet = L.mapbox.map('map', 'mapbox.light')
      .setView([37.8, -96], 4);

    L.marker([38.913184, -77.031952]).addTo(mapLeaflet);
    L.marker([37.775408, -122.413682]).addTo(mapLeaflet);


  }
  title = 'app works!';
}
