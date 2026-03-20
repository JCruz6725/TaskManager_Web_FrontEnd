import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { LoginUser } from '../../Models/login-user';
import { Router, RouterLink } from '@angular/router';
import { RequestHelperService } from '../../Services/BaseService/request-helper-service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(UserAuthService);
  model: LoginUser = {
    email: '',
    password: ''
  };
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  private Service = inject(RequestHelperService);
  private CookieService = inject(CookieService);

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
        this.CookieService.set('UserIdToken', response as string, { expires: .0208}); // Cookie expires in 30mins


        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage.set("Login failed. Please try again.");
          console.log('Login failed:', error);
        }
      }
    });

  }

}
