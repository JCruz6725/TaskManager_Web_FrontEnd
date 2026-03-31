import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { LoginUser } from '../../Models/login-user';
import { Router, RouterLink } from '@angular/router';
import { RequestHelperService } from '../../Services/BaseService/request-helper-service';
import { HttpErrorResponse } from '@angular/common/http';

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

  submitForm(form: any) {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (form.invalid) {
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    this.authService.loginUser(this.model).subscribe({
      next: (response: any) => {
        this.successMessage.set('Login successful!');
        console.log('User logged in successfully', response);
        this.Service.SetUserIdToken(response.userId);

        if(response.requiresExtraInfo) {
          this.router.navigate(['/extra-info']);
        }else {
        this.router.navigate(['/home']);
          }
      },
      error: (error : HttpErrorResponse) => {
        this.errorMessage.set(error.error);
      }
    });

  }

}
