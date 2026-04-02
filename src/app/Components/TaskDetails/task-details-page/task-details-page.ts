import { Component, inject, signal, } from '@angular/core';
import { Details } from '../details/details';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { ViewNotes } from '../view-notes/view-notes';
import { CreateNotes } from '../create-notes/create-notes';
import { ListService } from '../../../Services/ListServiceAll/get-all-list';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-task-details-page',
  imports: [Details, ViewNotes, CreateNotes, MatButtonModule],
  templateUrl: './task-details-page.html',
  styleUrl: './task-details-page.css',
})
export class TaskDetailsPage {
  private taskSvc = inject(TaskService);
  private sharedSvc = inject(DataSharingService);
  private listSvc = inject(ListService)
  private activeRouter = inject(ActivatedRoute);
  private router = inject(Router);

  private urlTaskId = signal<any>(null);
  public urlListId = signal<any>(null);
  private subscription: any;

  ngOnInit(){
    //grab task and list id from url, pass taskid to getData()
    this.activeRouter.params.subscribe((prm) => {
      this.urlListId.set(prm['listId']);
      this.urlTaskId.set(prm['taskId'])
      this.getData(this.urlTaskId());
    })
    
  }

  getData(taskId: string){
    //get task and parent data from service api & hydrate our shared service(for other components use)
    this.taskSvc.getTask(taskId).subscribe((res:any) => {
      this.sharedSvc.transmitChildData(res)
      //get task data for our parent task from api
      if (res.parentTaskId != null){
        this.taskSvc.getTask(res.parentTaskId).subscribe((res:any) => {
          //hydrate our shared service
          this.sharedSvc.transmitParentData(res);
        })
      }
    });

    //grab all tasks (in a list) from api and store in shared service (for editing task usage)
    this.listSvc.SingleList(this.urlListId()).subscribe((data:any) => {
      this.sharedSvc.transmitListData(data.taskItems);
    }) 
  }

  //post task after editing
  postData(taskId: string){
    this.sharedSvc.currentEditData$.subscribe((data:any) => {
      this.taskSvc.putTask(data, data.id).subscribe((res: any) => {
        this.getData(taskId);
      })
    }).unsubscribe();
  }

  onDelClick(){
    this.subscription = this.sharedSvc.confirmDialog({
      message: 'Delete task?',
      confirmText: 'Delete',
      cancelText: 'Keep'
    }).subscribe((res: boolean) => {
      if (res){
        this.taskSvc.deleteTask(this.urlTaskId()).subscribe((res:any) => {
          console.log("Deleted task " + res.title);
          this.router.navigateByUrl('/home');
        })
      }
    })
  }

  ontoggleStatusChange(taskId: any){
    this.urlTaskId.set(taskId);
    //refresh our data after status change
    this.getData(taskId);
  }

}
