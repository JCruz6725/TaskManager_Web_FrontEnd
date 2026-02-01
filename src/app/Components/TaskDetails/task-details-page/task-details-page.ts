import { Component, inject, Signal, signal, } from '@angular/core';
import { Details } from '../details/details';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { ViewNotes } from '../view-notes/view-notes';
import { CreateNotes } from '../create-notes/create-notes';


@Component({
  selector: 'app-task-details-page',
  imports: [Details, ViewNotes, CreateNotes],
  templateUrl: './task-details-page.html',
  styleUrl: './task-details-page.css',
})
export class TaskDetailsPage {
  private taskSvc = inject(TaskService);
  private sharedSvc = inject(DataSharingService);
  private activeRouter = inject(ActivatedRoute);
  private router = inject(Router);

  private urlTaskId = signal<any>(null);

  ngOnInit(){
    this.getData();
  }

  getData(){
    //grab current child task id from url
    if (this.urlTaskId() == null){
      this.activeRouter.params.subscribe((prm) => {
        this.urlTaskId.set(prm['id']);
      })
    }
    else{ //grab current child id from shared service
      this.sharedSvc.currentChildData$.subscribe((data) => {
        this.urlTaskId.set(data);
      });
    }

    //get task data from service api
    this.taskSvc.getTask(this.urlTaskId()).subscribe((res:any) => {
      //hydrate our shared data service (for other components use)
      this.sharedSvc.transmitChildData(res)
      //get task data for our parent task from api
      if (res.parentId != null){
        this.taskSvc.getTask(res.parentId).subscribe((res:any) => {
          //hydrate our shared service
          this.sharedSvc.transmitParentData(res);
        })
      }
    });
  }

  onDelClick(){
    this.taskSvc.deleteTask(this.urlTaskId()).subscribe((res:any) => {
      console.log("Deleted task " + res.title);
      this.router.navigateByUrl('/home');
    })
  }

}
