import { Component, inject, signal } from '@angular/core';
import { ResetPassword } from '../../Models/reset-password';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule, RouterLink, MatButton],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPasswordComponent {
  userSvc : UserAuthService = inject(UserAuthService);

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  model: ResetPassword = {
    email: '',
    oldPassword: '',
    newPassword: ''
  };

  submitForm(form: any){
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.userSvc.resetPassword(this.model).subscribe({
      next: (response) => {
        this.successMessage.set("Successfully Changed Password")
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error);
      }
    })
  }

}
