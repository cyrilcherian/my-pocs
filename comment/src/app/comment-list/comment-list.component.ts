import { Component, OnInit } from '@angular/core';
import { CommentService } from '../core/comment/comment.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  private comments: any;
  constructor(private commentService: CommentService, private _store: Store<any>) {
    this._store.select('comment').subscribe((d)=>{
      this.comments = d;
    });
  }

  ngOnInit() {
    this.commentService.getAll().subscribe(data => {
      var k1 = data as Array<any>
      this._store.dispatch({type:"INIT", payload: k1});
    });
  }

}
