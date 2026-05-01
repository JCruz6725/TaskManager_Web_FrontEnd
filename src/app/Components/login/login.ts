import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { LoginUser } from '../../Models/login-user';
import { Router, RouterLink } from '@angular/router';
import { RequestHelperService } from '../../Services/BaseService/request-helper-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatButton, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(UserAuthService);

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  private Service = inject(RequestHelperService);

  model: LoginUser = {
    email: '',
    password: ''
  };

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  submitForm() {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.loginForm.invalid) {
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    this.model.email = this.loginForm.value.email;
    this.model.password = this.loginForm.value.password;

    this.authService.loginUser(this.model).subscribe({
      next: (response) => {
        this.successMessage.set('Login successful!');
        console.log('User logged in successfully', response);
        this.Service.SetUserIdToken(response as string);

        //  the response is the user ID token
        let t = { userId: this.Service.GetUserIdToken() } ;

        this.authService.deviceDatum(t).subscribe({
          next: (Deviceresponse) => {
            console.log('Device data sent successfully', Deviceresponse);
          },
          error(err) {
            console.error('Error sending device data', err);
          },
        });
           this.router.navigate(['/home']);
      },
    });






    // if (this.Service.GetUserIdToken() == "") {
    //   this.errorMessage.set('Login failed. Please check your credentials and try again.');
    //   return;
    // }

  }
}




