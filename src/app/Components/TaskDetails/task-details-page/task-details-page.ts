import { Component, inject, Signal, signal, } from '@angular/core';
import { Details } from '../details/details';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { ViewNotes } from '../view-notes/view-notes';
import { CreateNotes } from '../create-notes/create-notes';
import { Subscription } from 'rxjs';


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
  private intervalSub : Subscription = new Subscription;


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

/* 
    //grab list id from url
    this.router.params.subscribe((prm) => {
      this.urlListId.set(prm['id']);
    })

    //grab all tasks (in a list) from api and store in shared service
    this.listSvc.SingleList(this.urlListId()).subscribe((data:any) => {
      this.sharedSvc.transmitListData(data.taskItems);
    }) */
  }

  postData(){
    console.log("here");
    this.sharedSvc.currentEditData$.subscribe((data:any) => {
      this.taskSvc.putTask(data, data.id).subscribe((res: any) => {
        console.log("api call made: ")
        console.log(res);
      })
    }).unsubscribe();
  }

  onDelClick(){
    this.taskSvc.deleteTask(this.urlTaskId()).subscribe((res:any) => {
      console.log("Deleted task " + res.title);
      this.router.navigateByUrl('/home');
    })
  }

}
