import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth.service';
import { RegisterUser } from '../../Models/register-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignupComponent {
  private authService = inject(UserAuthService);
  model: RegisterUser = {
    firstName: '',
    lastName: '',
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

    this.authService.registerUser(this.model).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful!';
        console.log('User registered successfully', response);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage = "Email already in use. Please use a different email.";
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }
}
