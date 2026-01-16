import { Component, inject, Signal, signal, } from '@angular/core';
import { Details } from '../details/details';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';


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

  private urlTaskId = signal<string>('');

  ngOnInit(){
    this.router.params.subscribe((prm) => {
      this.urlTaskId.set(prm['id']);
    })

    console.log("taskID: "+ this.urlTaskId());
    //get task data from service api
    this.taskSvc.getTask(this.urlTaskId()).subscribe((res:any) => {
      //hydrate our shared data service (for other components use)
      this.sharedSvc.transmitData(res);
      console.log("response: " + res.title)
    });
  }

}
