import { Component, inject, Signal, signal, } from '@angular/core';
import { Details } from '../details/details';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { submit } from '@angular/forms/signals';
import { ViewNotes } from '../view-notes/view-notes';


@Component({
  selector: 'app-task-details-page',
  imports: [Details, ViewNotes],
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
    //grab current child task id from url
    if (this.urlTaskId() == null){
      this.router.params.subscribe((prm) => {
        this.urlTaskId.set(prm['id']);
      })
    }
    else{ //grab current child id from shared service
      this.sharedSvc.currentChildData$.subscribe(data => this.urlTaskId.set(data));
    }

    //get task data from service api
    this.taskSvc.getTask(this.urlTaskId()).subscribe((res:any) => {
      //hydrate our shared data service (for other components use)
      this.sharedSvc.transmitChildData(res)
      //get task data for our parent task from api
      this.taskSvc.getTask(res.parentId).subscribe((res:any) => {
        //hydrate our shared service
        this.sharedSvc.transmitParentData(res);
      })
    });
  }

}
