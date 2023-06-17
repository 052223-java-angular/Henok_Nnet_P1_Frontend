import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterPayload } from 'src/app/models/register-payload';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router, private http: HttpClient, private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      zipCode: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.registerForm.invalid) {

      const username = this.registerForm.controls['username'].value;
      if(username.length === 0){
        this.registerForm.controls['username'].markAsTouched;
      }

      const zipCode = this.registerForm.controls['zipCode'].value;
      if(zipCode.length === 0){
        this.registerForm.controls['zipCode'].markAsTouched;
      }

      const password = this.registerForm.controls['password'].value;
      if(password.length === 0){
        this.registerForm.controls['password'].markAsTouched;
      }

      const confirmPassword = this.registerForm.controls['confirmPassword'].value;
      if(confirmPassword.length === 0){
        this.registerForm.controls['confirmPassword'].markAsTouched;
      }
      this.registerForm.reset();
      return;
    }

    const zipCode = this.registerForm.controls['zipCode'].value;

    this.http.get<any>(`http://api.zippopotam.us/us/${zipCode}`).subscribe({
      next: (data) => {
        const neighborhoodName = data.places[0]?.["place name"];
        const payload: RegisterPayload = {
          username: this.registerForm.controls['username'].value,
          zipCode: zipCode,
          password: this.registerForm.controls['password'].value,
          confirmPassword: this.registerForm.controls['confirmPassword'].value,
          neighborhoodName: neighborhoodName || '',
        };

        this.authService.register(payload).subscribe({
          next: () => {
            this.toster.success('Registration is successful');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.toster.error(error.error.message);
            
          }
        });
      },
      error: (error) => {
        this.toster.error("Invalid Zip Code provided");
      }
    });
  }
}
