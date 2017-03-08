import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AddressService {

  constructor() { }
  getHTML() {
      let p = new Promise((resolve) =>
          setTimeout(() => {
              let html = "<div><app-address></app-address></div>";
              resolve(html)
          }, 5000)
      )
      return Observable.fromPromise(p).map((responseData) => {
          return responseData;
      });
  }
}
