import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { RegisterUser } from '../../Models/register-user';
import { LoginUser } from '../../Models/login-user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
   private authService = inject(UserAuthService);
    model: LoginUser = {
      email: '',
      password: ''
    };
    errorMessage = signal<string | null>(null);
    successMessage = signal<string | null>(null);

    submitForm(form: any) {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    
    if (form.invalid) {
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    this.authService.loginUser(this.model).subscribe({
      next: (response) => {
        this.successMessage.set('Login successful!');
        console.log('User logged in successfully', response);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage.set("Login failed. Please try again.");
          console.log('Login failed:', error );
        } 
      }
    });
    
  }

}
