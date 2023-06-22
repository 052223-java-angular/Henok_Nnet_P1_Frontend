import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FeedPayload } from 'src/app/models/Feed-Payload';
import { CommentPayload } from 'src/app/models/Comment-Payload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostId } from 'src/app/models/PostId';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, ScrollingModule, CommonModule, MatFormFieldModule]
})
export class FeedComponent implements OnInit {
  feedPayload!: FeedPayload[];
  commentPayload!: CommentPayload[];
  posiId!: PostId;


  constructor(private authService: AuthServiceService, private toaster: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.getFeedPayload();
    this.getCommentPayload();
  }

  getFeedPayload(): void {
    this.authService.feed().subscribe(
      (payload: any) => {
        this.feedPayload = payload;
        this.posiId = payload.postId;
        this.getCommentPayload();
        this.toaster.success('Successful');
      },
      (error) => {
        this.toaster.error(error.error.message);
        alert(error.error.message);
        this.router.navigate(['**']);
      }
    );
  }

  getCommentPayload(): void{
    this.authService.comments(this.posiId).subscribe(
      (payload: any) => {
       
        this.commentPayload = payload;
        this.toaster.success('Successful');
      },
      (error) =>{
        this.toaster.error(error.error.message);
        alert(error.error.message);
        this.router.navigate(['**']);
      }
    );
  }
}
