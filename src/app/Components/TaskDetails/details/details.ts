import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailedTask } from '../../../Models/detailed-task';
import { Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, RouterLink, MatDatepickerModule,MatNativeDateModule, FormsModule, MatButtonModule, MatIcon],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  taskSvc: TaskService = inject(TaskService);
  sharedSvc: DataSharingService = inject(DataSharingService);

  public currentTask = signal<any>(null);
  public currentTaskDate = signal<any>(null);
  public currentTaskParent = signal<any>(null);

  public isEditing = signal<boolean>(false);

  @Output("getData") getData: EventEmitter<any> = new EventEmitter();
  @Output("postData") postData: EventEmitter<any> = new EventEmitter();
  @Input() urlListId : any; //used to pass into url
  @Output() toggleStatusChange = new EventEmitter();

  ngOnInit() {
    //grab our task, parent, and list data from our shared service
    this.sharedSvc.currentChildData$.subscribe((data) => {
      this.currentTask.set(data);
      if (this.currentTask().dueDate != null){
        this.currentTaskDate.set((new Date(this.currentTask().dueDate).toLocaleDateString()));
      }
      else {
        this.currentTaskDate.set('No Current Due Date');
      }
    })
    this.sharedSvc.currentParentData$.subscribe((data) => {
      this.currentTaskParent.set(data);
    })
    this.sharedSvc.currentListData$.subscribe((data) => { //this data is utilized within our editing state
      this.options = data;
    })
  }
  onParentClick() {
    //recall our parent component with new taskId to re-render our page
    this.getData.emit(this.currentTask().parentTaskId);
  }

  onEditClick(){
    this.isEditing.set(true);

    //grab all the tasks in our list to display for our parent search bar
    this.sharedSvc.currentListData$.subscribe((data) => {
      this.options = data;
    })
  }

  
  onCompleteClick() {
    console.log(this.currentTask().id)
    this.taskSvc.statusTask(this.currentTask().id).subscribe({
      next: (res: any) => {
        //refresh our data after status change
        this.sharedSvc.transmitChildData(res);
        this.toggleStatusChange.emit(this.currentTask().id);
        console.log("Task marked as complete: " + res.title);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400){
          this.sharedSvc.confirmDialog({
            title: 'Error',
            message: err.error,
            confirmText: 'Close'
          });
        }
      }
    })
  }

  /*Editing Task Section*/
  public searchResult = signal<Array<any>>([]);
  private options: Array<DetailedTask> = [];
  public barIsActive: boolean = true;
  public searchParent = signal<string>('');

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
    this.currentTask().parentTaskId = task.id;
    this.currentTask().parentTaskId = task.id
    this.barIsActive = false;
  }

  onSaveClick() {
    this.sharedSvc.transmitEditData(this.currentTask());
    this.postData.emit(this.currentTask().id);
    this.isEditing.set(false);
  }

}

