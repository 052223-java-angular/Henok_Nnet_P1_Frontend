import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor() {}

  // ngOnInit(): void {
  //   // Assuming you have a method in your authentication service to retrieve the user's role
  //   this.userRole = this.userRole = localStorage.getItem('userRole') || '';
  //   console.log(this.userRole);
  // }
}
