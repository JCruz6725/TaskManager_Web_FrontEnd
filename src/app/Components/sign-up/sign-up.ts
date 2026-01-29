import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { RegisterUser } from '../../Models/register-user';
import { CommonModule } from '@angular/common';
import { UserTokenService } from '../../Services/UserToken/user-token.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
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
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  private userTokenService = inject(UserTokenService);



  submitForm(form: any) {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    if (form.invalid) {
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    this.authService.registerUser(this.model).subscribe({
      next: (response) => {
        this.successMessage.set('Registration successful!');
        console.log('User registered successfully', response);
        this.userTokenService.SetUserIdToken(response as string);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage.set("Email already in use. Please use a different email.");
        } else {
          this.errorMessage.set('Registration failed. Please try again.');
        }
      }
    });
  }
}
