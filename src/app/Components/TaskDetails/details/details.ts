import { Component, inject, signal, input, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
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


  ngOnInit() {
    //grab our data from our shared service
    this.sharedSvc.currentData$.subscribe((data) => {
      this.currentTask.set(data);
    })

    if (this.currentTask().dueDate != null){
      this.currentTaskDate.set(new Date(this.currentTask().dueDate));
    }
    else{
      this.currentTaskDate.set('No Current Due Date');
    }
  }

  onParentClick(){
    this.sharedSvc.transmitData(this.currentTask().parentId);
    this.getData.emit();
  }



}

