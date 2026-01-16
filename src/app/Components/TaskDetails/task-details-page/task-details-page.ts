import { Component, inject, Signal, signal, } from '@angular/core';
import { Details } from '../details/details';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { submit } from '@angular/forms/signals';


@Component({
  selector: 'app-task-details-page',
  imports: [Details],
  templateUrl: './task-details-page.html',
  styleUrl: './task-details-page.css',
})
export class TaskDetailsPage {
  private taskSvc = inject(TaskService);
  private sharedSvc = inject(DataSharingService);
  private router = inject(ActivatedRoute);

  private urlTaskId = signal<any>(null);

  ngOnInit(){
    this.getData();
  }

  getData(){
    if (this.urlTaskId() == null){
      this.router.params.subscribe((prm) => {
        this.urlTaskId.set(prm['id']);
      })
    }
    else{
      this.sharedSvc.currentData$.subscribe(data => this.urlTaskId.set(data));
    }
    
    console.log("taskId: "+this.urlTaskId())
    //

    //get task data from service api
    this.taskSvc.getTask(this.urlTaskId()).subscribe((res:any) => {
      //hydrate our shared data service (for other components use)
      this.sharedSvc.transmitData(res)
      this.taskSvc.getTask(res.parentId).subscribe((res:any) => {
        this.sharedSvc.transmitDataParent(res);
      })
    });
  }

}
