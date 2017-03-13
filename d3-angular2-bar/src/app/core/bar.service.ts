import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';


@Injectable()
export class BarService {

  constructor() { }

  myData() {
    let p = new Promise((resolve) =>
      setTimeout(() => {
        let html = [{"salesperson":"Bob","sales":"33"},{"salesperson":"Robin","sales":"12"},{"salesperson":"Anne","sales":"41"},{"salesperson":"Mark","sales":"16"},{"salesperson":"Joe","sales":"59"},{"salesperson":"Eve","sales":"38"},{"salesperson":"Karen","sales":"21"},{"salesperson":"Kirsty","sales":"25"},{"salesperson":"Chris","sales":"30"},{"salesperson":"Lisa","sales":"47"},{"salesperson":"Tom","sales":"5"},{"salesperson":"Stacy","sales":"20"},{"salesperson":"Charles","sales":"13"},{"salesperson":"Mary","sales":"29"}];
        resolve(html)
      }, 5000)
    )
    return Observable.fromPromise(p).map((responseData) => {
      return responseData;
    });
  }

}
