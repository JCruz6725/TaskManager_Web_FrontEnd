import { Component, inject,output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateTask } from '../../../Models/create-task';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-create-details',
  imports: [ReactiveFormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule, RouterLink],
  templateUrl: './create-details.html',
  styleUrl: './create-details.css',
})
export class CreateDetails {
  private sharedSvc : DataSharingService = inject(DataSharingService);
  notify = output<string>();

  newTask: CreateTask = {
    title: '',
    dueDate: '',
    priority: 0,
    parentId: '',
  };

  onSubmit() {
    //send our data to our shared service
    this.sharedSvc.transmitChildData(this.newTask);
    console.log("duedate: "+this.newTask.dueDate);
    //notify our parent component of new data
    this.notify.emit('');
  }

}
