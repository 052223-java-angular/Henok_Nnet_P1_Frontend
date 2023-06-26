import { Component, OnInit, ViewChild } from '@angular/core';
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
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { UserName } from 'src/app/models/UserName';
import { DeletePayload } from 'src/app/models/DeletePayload';
import { FilterFeed } from 'src/app/models/Filter-Feed';
import { DeleteComment } from 'src/app/models/Delete-Comment';

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
        SidebarComponent
    ]
})
export class FeedComponent implements OnInit {
  // @ViewChild(SidebarComponent)
  sidebarComponent!: SidebarComponent;
  
  feedPayload!: FeedPayload[];
  commentPayload!: CommentPayload[];
  username!: UserName;
  commentText!: string;
  addComment!: AddComment;
  currentUser!: String;
  currentUserRole!: String;
  filterFeed!: FilterFeed;
  // filterFeed: FilterFeed = {
    // category: ''
  // };

  selectedCategory!: string;

  constructor(
    private authService: AuthServiceService,
    private toaster: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getFeedPayload();
    this.getUserName();
  }


  getUserName(): void {
    this.authService.getuserName().subscribe(
      (payload: UserName) => {
        this.currentUser = payload.username;
        this.currentUserRole = payload.userRole;
      }
    );
  }

  // selectCategory(category: string): void {
  //   this.filterFeed.category = category; //this might scream
  //   if (category === null) {
  //     this.getFeedPayload();
  //   } else {
  //     this.getPostsByCategory();
  //   }
  // }
  
  selectCategory(category: string): void {
    // this.selectedCategory = category;
    this.filterFeed.category = category;
    this.getPostsByCategory();
  }
  
  // getPostsByCategory(): void {
  //   this.authService.getPostsByCategory(this.filterFeed).subscribe({
  //     next: (resp: any) => {
  //       console.log(resp);
  //       if (Array.isArray(resp)) {
  //         this.feedPayload = resp;
  //       } else {
  //         this.feedPayload = [resp];
  //       }
  //     },
  //     error: (e: any) => {
  //       console.log(e);
  //     }
  //   });
  // }
  getPostsByCategory(): void {
    this.authService.getPostsByCategory(this.filterFeed).subscribe({
      next: (resp: any) => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.feedPayload = resp;
        } else {
          this.feedPayload = [resp];
        }
      },
      error: (e: any) => {
        console.log(e);
      }
    });
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
        console.log(e.error.message);
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
        window.location.reload();
      },
      error: e => {
        alert("can not comment here!")
      }
    });
    this.commentText = '';
  }


  deletePost(postId: string) {
    const payload : DeletePayload = {
      commentId: '',
      postId: postId,
    } 
    this.authService.deletePost(payload).subscribe({
      next: resp => {
        alert("Deleted Sucessfully!!!")
        this.toaster.success('deleted successfully!!');
        window.location.reload();
      },
      error: e => {
        alert("can not delete this!")
      }
    
  });
}
 

deleteComment(comment: CommentPayload) {
  console.log("here"),
  console.log(comment.comment );
  const payload : DeleteComment = {
    comment : comment.comment,
    username : comment.username,
    like: comment.like,
    userId: comment.userId,
    
  } 
this.authService.deleteComment(payload).subscribe({
  next: resp => {
    alert("Deleted Successfully");
    this.toaster.success('deleted successfully!!');
    window.location.reload();
  },
  error: e => {
    alert("can not delete this!")
  }
});
}
}




