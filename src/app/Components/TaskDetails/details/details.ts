import { Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';


@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  taskSvc : TaskService = inject(TaskService);
  sharedSvc : DataSharingService = inject(DataSharingService);

  public currentTask = signal<any>(null);
  public currentTaskDate = signal<any>(null);
  public currentTaskParent = signal<any>(null);

  @Output("getData") getData: EventEmitter<any> = new EventEmitter();
  @Output()

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
onCompleteClick(){
    this.taskSvc.statusTask(this.currentTask().id).subscribe((res:any) => {

      console.log("Task marked as complete: " + res.title);
    })
  }


}

