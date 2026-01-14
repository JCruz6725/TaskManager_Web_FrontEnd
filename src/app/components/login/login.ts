import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth.service';
import { RegisterUser } from '../../Models/register-user';
import { LoginUser } from '../../Models/login-user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  // private authService = inject(UserAuthService);

  // model: { email: string; password: string } = {
  //   email: '',
  //   password: ''
  // };

  // errorMEssage: string | null = null;
  // successMessage: string | null = null;

  // submitForm() {
  //   this.errorMEssage = null;
  //   this.successMessage = null;

  //   if (this.model.email === null || this.model.password === null) {
  //     this.errorMEssage = 'Please fill in all required fields correctly.';
  //     return;
  //   }
  //  this.authService.loginUser(this.model).subscribe({
  //     next: (response) => {
  //       this.successMessage = 'Login successful!';
  //       console.log('User logged in successfully', response);
  //     },
  //     error: (error) => {
  //       if (error.status === 404){
  //         this.errorMEssage = "User not found. Please check your email.";
  //       } else if (error.status === 401){
  //         this.errorMEssage = "Incorrect password. Please try again.";
  //       } else {
  //         this.errorMEssage = 'Login failed. Please try again.';
  //       }
  //     }
  //   });
  // }


   private authService = inject(UserAuthService);
    model: LoginUser = {
      email: '',
      password: ''
    };

    errorMessage: string | null = null;
    successMessage: string | null = null;


    submitForm(form: any) {
    this.errorMessage = null;
    this.successMessage = null;
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.authService.loginUser(this.model).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful!';
        console.log('User logged in successfully', response);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage = "Login failed. Please try again.";
          console.log('Login failed:', error );
        } 
      }
    });
  }

}
