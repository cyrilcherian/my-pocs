import { Component, OnInit, Input } from '@angular/core';
import {Gravatar} from 'ng2-gravatar-directive';
@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css']
})
export class CommentViewComponent implements OnInit {

  constructor() { }
  @Input() comment;
  ngOnInit() {
  }
  getImageURL(){
    if (this.comment)
      return "http://www.gravatar.com/avatar/?class="+this.comment.user_id+"&d=identicon";
  }
}
