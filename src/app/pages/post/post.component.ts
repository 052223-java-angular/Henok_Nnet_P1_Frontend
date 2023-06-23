import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit{
  @ViewChild(SidebarComponent)
  sidebarComponent!: SidebarComponent;


  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

}
