import { Component, inject, signal } from '@angular/core';
import { ResetPassword } from '../../Models/reset-password';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserAuthService } from '../../Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, MatButton],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPasswordComponent {
  userSvc : UserAuthService = inject(UserAuthService);

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  private passwordValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const hasSpecialChar: boolean = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return hasSpecialChar ? null : {specialCharMissing: true};
   }
  }

  model: ResetPassword = {
    email: '',
    oldPassword: '',
    newPassword: ''
  };

  resetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.resetForm = this.formBuilder.group({
      email: '',
      oldPassword: '',
      newPassword: ['', [Validators.required, this.passwordValidator()]]
    });

  }

  submitForm(){
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.model.email = this.resetForm.value.email!;
    this.model.oldPassword = this.resetForm.value.oldPassword!;
    this.model.newPassword = this.resetForm.value.newPassword!;

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
