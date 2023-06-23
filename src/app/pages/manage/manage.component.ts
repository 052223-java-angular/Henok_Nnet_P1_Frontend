
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AllUsers } from 'src/app/models/AllUsers';
import { UserPayload } from 'src/app/models/UserPayload';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';



@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.css'],
    standalone: true,
    imports: [MatCardModule, CommonModule, SidebarComponent]
})
export class ManageComponent implements OnInit {
  @ViewChild(SidebarComponent)
  sidebarComponent!: SidebarComponent;

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

  promoteUser(userId: string): void {
    const payload: UserPayload = {
      userId: userId,
    };

    this.authService.promoteUser(payload).subscribe({
      next: () => {
        console.log(payload.userId);
        alert('User promoted successfully');
        this.fetchAllUsers();
      },
      error: e => {
        console.log(e);
      }
    });
  }

}



