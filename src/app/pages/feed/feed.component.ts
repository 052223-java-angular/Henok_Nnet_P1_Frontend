import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FeedPayload } from 'src/app/models/Feed-Payload';
import { CommentPayload } from 'src/app/models/Comment-Payload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddComment } from 'src/app/models/Add-Comment';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';




@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    ScrollingModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
  ]
})
export class FeedComponent implements OnInit {
  feedPayload!: FeedPayload[];
  commentPayload!: CommentPayload[];
  commentText!: string;
  addComment!: AddComment;

  constructor(
    private authService: AuthServiceService,
    private toaster: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getFeedPayload();
  }

  getFeedPayload(): void {
    this.authService.feed().subscribe({
      next: resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.feedPayload = resp;
        } else {
          this.feedPayload = [resp];
        }
      },
      error: e => {
        console.log(e);
      }
    });
  }

  submitComment(postId: string): void {
    const payload: AddComment = {
      postId: postId,
      comment: this.commentText
    };

    this.authService.submitComment(payload).subscribe({
      next: resp => {
        this.toaster.success('commented successfully!!');
      },
      error: e => {
        alert("can not comment here!")
      }
    });
    this.commentText = '';
  }
}
