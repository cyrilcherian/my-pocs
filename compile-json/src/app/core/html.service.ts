import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class HtmlService {

  constructor() { }
  html() {
    let p = new Promise((resolve) =>
      setTimeout(() => {
        let html = {
          "slot_linklist": [{ "slot_link": { "title": "abcd", "src": "/vv/nvv.html" } },
            { "slot_link": { "title": "xyz", "src": "/vv/xxyyzz.html" } },
            { "slot_image": { "title": "def", "src": "http://stech1.firstpost.com/tech2images/640x359/proportional/jpeg/2017/03/61_big-624x351.jpg" } },
            { "slot_image": { "title": "abc", "src": "http://www.planwallpaper.com/static/images/background-gmail-google-images_FG2XwaO.jpg" } }]
        };
        resolve(html)
      }, 5000)
    )
    return Observable.fromPromise(p).map((responseData) => {
      return responseData;
    });
  }


}
