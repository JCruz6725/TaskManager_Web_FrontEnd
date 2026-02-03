import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailedTask } from '../../../Models/detailed-task';


@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, RouterLink, MatDatepickerModule,MatNativeDateModule, FormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  taskSvc : TaskService = inject(TaskService);
  sharedSvc : DataSharingService = inject(DataSharingService);

  public currentTask = signal<any>(null);
  public currentTaskDate = signal<any>(null);
  public currentTaskParent = signal<any>(null);

  public isEditing = signal<boolean>(false);

  @Output("getData") getData: EventEmitter<any> = new EventEmitter();
  @Output("postData") postData: EventEmitter<any> = new EventEmitter();


  ngOnInit() {
    //grab our data from our shared service
    this.sharedSvc.currentChildData$.subscribe((data) => {
      this.currentTask.set(data);
    })
    this.sharedSvc.currentParentData$.subscribe((data) => {
      this.currentTaskParent.set(data);
    })

    if (this.currentTask().dueDate != null){
      this.currentTaskDate.set(new Date(this.currentTask().dueDate));
    }
    else{
      this.currentTaskDate.set('No Current Due Date');
    }

  }

  onParentClick(){
    //update our child data in our shared service
    this.sharedSvc.transmitChildData(this.currentTask().parentId);
    //recall our parent component to re-render our page
    this.getData.emit();
  }

  onEditClick(){
    this.isEditing.set(true);

    //grab all the tasks in our list to display for our parent search bar
    this.sharedSvc.currentListData$.subscribe((data) => {
      this.options = data;
    })
  }

  /*Editing Task Section*/
  public searchResult = signal<Array<any>>([]);
  private options: Array<DetailedTask> = [];
  public barIsActive: boolean = true;
  public searchParent = signal<string>('');

  onSaveClick() {
    const sendingTask = this.currentTask();
    //hydrate shared service to make api call
    this.sharedSvc.transmitEditData(sendingTask);

    console.log("emitting postData")
    this.postData.emit();


/*     this.isEditing.set(false);
    console.log("emitting getData");
    this.getData.emit(); */
  }

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
    //this.newTask.parentId = task.id; 
    console.log("taskId: "+task.id)
    this.currentTask().parentId.set(task.id);
    this.barIsActive = false;
  }

}

