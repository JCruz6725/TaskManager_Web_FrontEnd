import { CommonModule } from '@angular/common';
import { Component, inject , signal } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../../Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { RequestHelperService } from '../../../Services/BaseService/request-helper-service';
import { MatButton } from '@angular/material/button';
import { ExtraInfo } from '../../../Models/extrainfo';

@Component({
  selector: 'app-extra-info-component',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, MatButton],
  templateUrl: './extra-info-component.html',
  styleUrl: './extra-info-component.css',
})
export class ExtraInfoComponent {
  private router = inject(Router);
  private authService = inject(UserAuthService);
  // private Service = inject(RequestHelperService);

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  model : ExtraInfo = {
  address1: '',
  city: '',
  state:'',
  zipCode: '',
  dateOfBirth:undefined,
  phoneNumber: '',
  gender:'',
  education:'',
  employer: '',
  jobTitle:'',
  licenseTitle:'',
  purposeTitle:''
};
licenseTitle=[
  {Id:'A6698723-1FBC-48D6-B30E-A42EAADA7453', name :'Free'},
  {Id:'F92D11CA-B47D-45C8-AD09-83FA0E99C073', name :'Paid'},
];
purposeTitle=[
  {Id:'2E0DD98D-F3EC-4C65-B5DF-19C7D52B24D4', name:'Education'},
  {Id:'C3722436-57B3-44E0-9923-D7B177311ABA', name:'Personal'},
  {Id:'99DAFECC-0A8C-47F6-8135-DBD783594F9B', name:'Work'}
];
  profileForm! : FormGroup;

constructor(private FormBuilder: FormBuilder) {
  this.profileForm = this.FormBuilder.group({
    address1: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: undefined,
    phoneNumber: '',
    gender: '',
    education: '',
    employer: '',
    jobTitle: '',
    licenseTitle: '',
    purposeTitle: ''
  });
}

submitForm() {
  this.errorMessage.set(null);
  this.successMessage.set(null);

  this.model.address1 = this.profileForm.value.address1;
  this.model.city = this.profileForm.value.city;
  this.model.state = this.profileForm.value.state;
  this.model.zipCode = this.profileForm.value.zipCode;
  this.model.dateOfBirth = this.profileForm.value.dateOfBirth;
  this.model.phoneNumber = this.profileForm.value.phoneNumber;
  this.model.gender = this.profileForm.value.gender;
  this.model.education = this.profileForm.value.education;
  this.model.employer = this.profileForm.value.employer;
  this.model.jobTitle = this.profileForm.value.jobTitle;
  this.model.licenseTitle = this.profileForm.value.licenseTitle;
  this.model.purposeTitle = this.profileForm.value.purposeTitle;



    this.authService.postProfileUser(this.model).subscribe({
      next: (response) => {
        console.log('Extra information submitted successfully', response);
        this.successMessage.set('Extra information submitted successfully!');
        this.router.navigate(['/home'])
      },
      error: (error : HttpErrorResponse) => {
        this.errorMessage.set(error.error);
        console.log(error);
      }
    });
  }
}
