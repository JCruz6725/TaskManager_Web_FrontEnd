import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateTask } from '../../../Models/create-task';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { Router, RouterLink } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DetailedTask } from '../../../Models/detailed-task';


@Component({
  selector: 'app-create-details',
  imports: [ReactiveFormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './create-details.html',
  styleUrl: './create-details.css',
})
export class CreateDetails {
  private sharedSvc : DataSharingService = inject(DataSharingService);
  notify = output<string>();
  newDate:any;
  private router = inject(Router);

  public searchParent = signal<string>('');
  public searchResult = signal<Array<any>>([]);
  public barIsActive: boolean = true;
  private options: Array<DetailedTask> = [];
  
  ngOnInit(){
    //grab all the tasks in our list to display for our parent search bar
    this.sharedSvc.currentListData$.subscribe((data) => {
      this.options = data;
    })
  } 

  //generic interface
  newTask: CreateTask = {
    title: '',
    dueDate: null,
    priority: 0,
    parentId: null,
  };

  //triggered everytime something is typed in parent search bar
  fetchParentTask(task: any){
    if (task.target.value === ''){ //if nothing in search bar, set result to empty
      return this.searchResult.set([]);
    }
    //filter our options with what matches in our search bar
    this.searchResult.set(this.options.filter((opt) => {
      return opt.title.toLowerCase().startsWith(task.target.value.toLowerCase());
    }))
    this.barIsActive = true;
  }

  //triggered when a task is selected from dropdown menu
  onSelectTask(task:any){
    this.searchParent.set(task.title);
    this.newTask.parentId = task.id; 
    this.barIsActive = false;
  }


  onSubmit(path: string) {
    //format our dueDate
    if (this.newTask.dueDate != null){
      this.newDate = formatDate(this.newTask.dueDate, 'yyyy-MM-dd', 'en')
      this.newTask.dueDate = this.newDate
    }

    //send our data to our shared service
    this.sharedSvc.transmitChildData(this.newTask);
    //notify our parent component of new data
    this.notify.emit('');
    //navigate back to home
    this.router.navigateByUrl(path);
  }

}
