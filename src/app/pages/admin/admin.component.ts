import { Component, OnInit, ViewChild } from '@angular/core';
import { AllHoods } from 'src/app/models/Hoods';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: true,
    imports: [MatCardModule, CommonModule, SidebarComponent]
})
export class AdminComponent implements OnInit {
  @ViewChild(SidebarComponent)
  sidebarComponent!: SidebarComponent;

  allHoods: AllHoods[] = [];

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.fetchAllHoods();
  }

  fetchAllHoods(): void {
    this.authService.gethoods().subscribe({
      next: resp => {
        console.log(this.allHoods);
        if (Array.isArray(resp)) {
          this.allHoods = resp;
        } else {
          this.allHoods = [resp];
        }
      },
      error: e => {
        console.log(e);
      }
    });
  }
}
