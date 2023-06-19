import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginPayload } from 'src/app/models/Login-Payload';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router, private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {

      const username = this.loginForm.controls['username'].value;
      if(username.length === 0){
        this.loginForm.controls['username'].markAsTouched;
      }

      const password = this.loginForm.controls['password'].value;
      if(password.length === 0){
        this.loginForm.controls['password'].markAsTouched;
      }

      this.loginForm.reset();
      return;
      }


        const payload: LoginPayload = {
          username: this.loginForm.controls['username'].value,
          password: this.loginForm.controls['password'].value,
        };

        this.authService.login(payload).subscribe({
          next: () => {
            this.toster.success('Login is successful');
            this.router.navigate(['/feed']);
          },
          error: (error) => {
            this.toster.error(error.error.message);
            
          }
        });
  }
}

