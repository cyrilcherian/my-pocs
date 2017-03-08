import { Component, OnInit } from '@angular/core';
import { CommentService } from '../core/comment/comment.service'
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  private comments: Array<any>;
  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.commentService.getAll().subscribe(data => {
      this.comments = data as Array<any>
    });
  }

}
