import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CreateTask } from '../../../Models/create-task';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@Component({
  selector: 'app-create-details',
  imports: [ReactiveFormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-details.html',
  styleUrl: './create-details.css',
})
export class CreateDetails {

  taskForm = new FormGroup({
    title: new FormControl(''),
    dueDate: new FormControl(''),
    status: new FormControl(''),
    priority: new FormControl(''),
    parentTask: new FormControl('')
  })

  onSubmit(){
    
  }
}
