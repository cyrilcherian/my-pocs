import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CommentInputComponent } from './comment-input/comment-input.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentViewComponent } from './comment-view/comment-view.component';
import { CommentService } from './core/comment/comment.service';
import {Gravatar} from 'ng2-gravatar-directive';

@NgModule({
  declarations: [
    AppComponent,
    CommentInputComponent,
    CommentListComponent,
    CommentViewComponent,
    Gravatar
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
