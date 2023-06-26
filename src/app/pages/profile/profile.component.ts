
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { UpdateUser } from 'src/app/models/Update-User';
import { FormGroup, FormsModule } from '@angular/forms';
import { UpdateUserPayload } from 'src/app/models/UserUpdatePayload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [SidebarComponent, MatCardModule, CommonModule, FormsModule]
})
export class ProfileComponent implements OnInit {
  @ViewChild(SidebarComponent)
  sidebarComponent!: SidebarComponent;

  updateUserPayload : UpdateUserPayload  = {
    username: '',
    email: '',
    neighborhoodName: '',
    zipCode: 0
  }; 
  updateUser!: UpdateUser;
  editForm!: FormGroup;

  username!: string;
  email!: string;
  neighborhood!: string;
  zipCode!: number;
  password!: string;
  confirmPassword!: string;

  constructor(
    private authService: AuthServiceService,
    private matCard: MatCardModule,
    private toster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(): void {
    this.authService.getUserProfile().subscribe((payload: UpdateUser) => {
      console.log(payload);
      this.updateUser = payload;
      this.username = payload.username;
      this.email = payload.email;
      this.neighborhood = payload.neighborhoodName;
      this.zipCode = payload.zipcode;
    });
  }

  updateProfile(): void {

    
    this.updateUserPayload = {
      username: this.username,
      email: this.email,
      neighborhoodName: this.neighborhood,
      zipCode: this.zipCode,
    };

    console.log(this.updateUserPayload)

    this.authService.updateUserProfile(this.updateUserPayload).subscribe({
      next: () => {
        console.log(this.updateUserPayload);
        this.toster.success('Updated successfully');
        alert('Profile updated successfully!');
        window.location.reload();
      },
      error: (error) => {
        this.toster.error(error.error.message);
        // alert('Failed to update profile. Please try again.');
        alert(error.error.message);
      },
    });
  }
}

