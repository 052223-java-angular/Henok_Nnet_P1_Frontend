import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports:[ 
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    ScrollingModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,]
})
export class SidebarComponent {
  userRole!: string;

  constructor(private MatButtonModule: MatButtonModule, 
    private MatCardModule: MatCardModule,
    private MatIconModule: MatIconModule,
    private MatMenuModule: MatMenuModule,
    private ScrollingModule: ScrollingModule,
    private CommonModule: CommonModule,
    private MatFormFieldModule: MatFormFieldModule,
    private FormsModule: FormsModule,
    private router:Router,
    private authService: AuthServiceService) {}

    homeButtonClick(): void {
      this.router.navigate(['/']); 
    }

    feedButtonClick(): void {
      this.router.navigate(['/feed']);
    }

    postButtonClick(): void {
      this.router.navigate(['/post']); 
    }

    profileButtonClick(): void {
      this.router.navigate(['/profile']); 
    }
    
    logoutButtonClick(): void {
      this.authService.logout();
      this.router.navigate(['/']); 
    } 
}
