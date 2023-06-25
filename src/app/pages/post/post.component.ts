import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { PostPayload } from 'src/app/models/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
  imports: [MatCardModule, SidebarComponent, MatMenuModule, MatIconModule, MatButtonModule, ScrollingModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class PostComponent implements OnInit{
  @ViewChild(SidebarComponent)
  sidebarComponent!: SidebarComponent;

  postForm!: FormGroup;

  category!: string;

  constructor(private toster: ToastrService, private matForm: MatFormFieldModule, private router: Router, private fb: FormBuilder, private authService: AuthServiceService) {}


  
  ngOnInit(): void {
    this.postForm = this.fb.group({
      category: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      contact: ['']
    });    
  }

  // setCategory(category: string) {
  //   
  // }
  setCategory(category: string) {
    this.category = category;
    this.postForm.controls['category'].setValue(category);
  }
  
  
  submitForm(): void {
    if (this.postForm.invalid) {

      const title = this.postForm.controls['title'].value;
      if(title.length === 0){
        this.postForm.controls['title'].markAsTouched;
      }

      const description = this.postForm.controls['description'].value;
      if(description.length === 0){
        this.postForm.controls['description'].markAsTouched;
      }

      return;
    }

   
      const payload: PostPayload = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value,
        location: this.postForm.controls['location'].value,
        contact: this.postForm.controls['contact'].value,
        category: this.category,
      };
    

        this.authService.createPost(payload).subscribe({
          next: () => {
            console.log(payload);
            this.toster.success('Posted successfully');
            alert("Posted Successfully!!");
            this.router.navigate(['/feed']);
          },
          error: (error) => {
            this.toster.error(error.error.message);
            alert("Please select Category");
            
          }
        });

      }  
    };