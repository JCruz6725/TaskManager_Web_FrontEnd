import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  private Service = inject(RequestHelperService);

  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
     const password = control.value;
     const hasSpecialChar: boolean = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
 
     return hasSpecialChar ? null : {specialCharMissing: true};
    }
  }

  model: RegisterUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: ['', [Validators.required, this.passwordValidator()]]
    });

  }

  submitForm() {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    if (this.signUpForm.invalid) {
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
