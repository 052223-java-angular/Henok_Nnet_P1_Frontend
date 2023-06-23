
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AllUsers } from 'src/app/models/AllUsers';
import { UserPayload } from 'src/app/models/UserPayload';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  standalone: true,
  imports:[MatCardModule, CommonModule]
})
export class ManageComponent implements OnInit {

  allUsers: AllUsers[] = [];
  postId !: string;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    this.authService.getusers().subscribe({
      next: resp => {
        console.log(this.allUsers);
        if (Array.isArray(resp)) {
          this.allUsers = resp;
        } else {
          this.allUsers = [resp];
        }
      },
      error: e => {
        console.log(e);
      }
    });
  }

  

  deleteUser(userId: string): void {
    const payload: UserPayload = {
      userId: userId,
    };

    this.authService.deleteUser(payload).subscribe({
      next: () => {
        alert("Clock ok to Proceed deleting ");
        this.allUsers = this.allUsers.filter(user => user.id !== userId);
      },
      error: e => {
        console.log(payload);
      }
    });
  }

}



