import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { RegisterUser } from '../../Models/register-user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RequestHelperService } from '../../Services/BaseService/request-helper-service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataSharingService } from '../../Services/TaskServices/DataSharingService/data-sharing-service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignupComponent {
  private authService = inject(UserAuthService);
  private sharedSvc : DataSharingService = inject(DataSharingService);

  model: RegisterUser = {
    firstName: '',
    lastName: '',
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

    this.authService.registerUser(this.model).subscribe({
      next: (response) => {
        this.successMessage.set('Registration successful!');
        console.log('User registered successfully', response);
        this.Service.SetUserIdToken(response as string);
      },
      error: (error : HttpErrorResponse) => {
        this.sharedSvc.confirmDialog({
          title: 'Error',
          message: error.error,
          confirmText: 'Close'
        });
      }
    });
  }
}
