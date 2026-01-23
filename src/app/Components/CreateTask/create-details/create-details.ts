import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateTask } from '../../../Models/create-task';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { RouterLink } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DetailedTask } from '../../../Models/detailed-task';


@Component({
  selector: 'app-create-details',
  imports: [ReactiveFormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule, RouterLink, MatOption, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './create-details.html',
  styleUrl: './create-details.css',
})
export class CreateDetails {
  private sharedSvc : DataSharingService = inject(DataSharingService);
  notify = output<string>();
  newDate:any;

  public searchParent = signal<string>('');
  public searchResult = signal<Array<any>>([]);
  public barIsActive: boolean = true;
  public selectedInput = signal<any>({});
  private tempO: Array<DetailedTask> = [];
  
   ngOnInit(){
    this.sharedSvc.currentListData$.subscribe((data) => {
      this.tempO = data;
    })
    console.log(this.tempO)
  } 

  newTask: CreateTask = {
    title: '',
    dueDate: null,
    priority: 0,
    parentId: null,
  };

  fetchParentTask(event: any){
    if (event.target.value === ''){
      return this.searchResult.set([]);
    }
    this.searchResult.set(this.tempO.filter((series) => {
      return series.title.toLowerCase().startsWith(event.target.value.toLowerCase());
    }))
    this.barIsActive = true;
  }

  onSelectTask(series:any){
    this.selectedInput.set(series);
    this.searchParent.set(series.title);
    this.newTask.parentId = series.id;
    this.barIsActive = false;
  }


  onSubmit() {
    if (this.newTask.dueDate != null){
      this.newDate = formatDate(this.newTask.dueDate, 'yyyy-MM-dd', 'en')
      this.newTask.dueDate = this.newDate
    }

    //send our data to our shared service
    this.sharedSvc.transmitChildData(this.newTask);
    //notify our parent component of new data
    this.notify.emit('');
  }

}
