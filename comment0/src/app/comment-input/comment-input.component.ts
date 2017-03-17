import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../core/comment/comment.service';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-comment-input',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.css']
})
export class CommentInputComponent implements OnInit, OnDestroy {

  data: any = { email: "", comment: "" };
  comment = new FormControl('', [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
  myForm: FormGroup = this.builder.group({
    comment: this.comment,
    email: this.email
  });
  constructor(private builder: FormBuilder, private commentService: CommentService, private _store: Store<any>) {
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }
  
  addComment() {
    console.log(this.data)
    this.commentService.add(this.data);
  }
}
