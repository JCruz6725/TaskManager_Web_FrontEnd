import { Component, inject, signal } from '@angular/core';
import { ResetPassword } from '../../Models/reset-password';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
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

  resetForm = new FormGroup({
    email: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl('')
  });

  submitForm(){
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.model.email = this.resetForm.value.email!;
    this.model.oldPassword = this.resetForm.value.oldPassword!;
    this.model.newPassword = this.resetForm.value.newPassword!;

    console.log(this.model);

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
