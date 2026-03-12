import { Component, inject, signal } from '@angular/core';
import { ResetPassword } from '../../Models/reset-password';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPasswordComponent {
  userSvc : UserAuthService = inject(UserAuthService);
  successMessage = signal<string | null>(null);

  model: ResetPassword = {
    email: '',
    oldPassword: '',
    newPassword: ''
  };

  submitForm(form: any){
    this.successMessage.set(null);

    this.userSvc.resetPassword(this.model).subscribe({
      next: (response) => {
        this.successMessage.set("Successfully Changed Password")
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    })
  }



}
