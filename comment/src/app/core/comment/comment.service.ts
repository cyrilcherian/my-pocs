import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import {Store} from '@ngrx/store';

@Injectable()
export class CommentService {
  constructor(private _store: Store<any>, private http: Http) {
  }

  private comments = [{ "id": 1, "comment": "reading angular 2", user_id: "cyril@mobomo.com", date: "08/Mar/2017" },
    { "id": 2, "comment": "making angular 1 demo", user_id: "cyril@mobomo.com", date: "07/Mar/2017" },
    { "id": 3, "comment": "making POC on angular 2.making POC on angular 2 making POC on angular 2.making POC on angular 2 making POC on angular 2", user_id: "cyrilcherian@gmail.com", date: "01/Mar/2017" },
    { "id": 4, "comment": "making POC on angular 2.making POC on angular 2 making POC on angular 2.making POC on angular 2 making POC on angular 2", user_id: "cyrilcherian@gmail.com", date: "02/Mar/2017" },
    { "id": 5, "comment": "making POC on angular 2.making POC on angular 2 making", user_id: "cyrilcherian@gmail.com", date: "03/Mar/2017" }];
  getAll() {
    let p = new Promise((resolve) =>
      setTimeout(() => resolve(JSON.parse(JSON.stringify(this.comments))), 500)
    )
    return Observable.fromPromise(p).map((responseData) => {
      return responseData;
    });
  }
  add(o) {
    o.id = this.comments.length + 1;
    var k = this._store.dispatch({type:"ADD", payload: o});
    this.comments.push(o)
  }
}
