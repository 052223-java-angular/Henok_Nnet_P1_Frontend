import { Component, OnInit, NgModule  } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FeedPlayload } from 'src/app/models/Feed-Payload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';





@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, ScrollingModule, MatMenuModule, MatFormFieldModule],
  
})


export class FeedComponent implements OnInit {

  feedPayload!: FeedPlayload;

  constructor(private authService: AuthServiceService, private toaster: ToastrService, private router: Router){

  }

  ngOnInit(): void {
    this.getFeedPayload();
  }

  getFeedPayload(): void{
    this.authService.feed().subscribe({
      next: (payload: FeedPlayload) => {
        this.feedPayload = payload;
        console.log(this.feedPayload);
        this.toaster.success("successful");
      },
      error: (error) => {
        this.toaster.error(error.error.message);
        alert(error.error.message);
        this.router.navigate(['**']);
        
      }
    });
  } 


}
