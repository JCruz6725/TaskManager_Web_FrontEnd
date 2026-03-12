import { Component, inject, model } from '@angular/core';
import { ResetPassword } from '../../Models/reset-password';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { LoginUser } from '../../Models/login-user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPasswordComponent {
  userSvc : UserAuthService = inject(UserAuthService);

  model: ResetPassword = {
    email: '',
    oldPassword: '',
    newPassword: ''
  };

  submitForm(form: any){
    this.userSvc.resetPassword(this.model).subscribe({
      next: (response) => {
        console.log("successfully changed password")
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    })
  }



}
