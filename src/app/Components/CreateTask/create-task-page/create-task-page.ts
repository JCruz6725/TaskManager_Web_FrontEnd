import { Component, inject } from '@angular/core';
import { CreateDetails } from '../create-details/create-details';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../../Services/ListServiceAll/get-all-list';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';

@Component({
  selector: 'app-create-task-page',
  imports: [CreateDetails],
  templateUrl: './create-task-page.html',
  styleUrl: './create-task-page.css',
})
export class CreateTaskPage {
  private taskSvc = inject(TaskService);
  private listSvc = inject(ListService);
  private sharedSvc = inject(DataSharingService);
  private router = inject(ActivatedRoute);

  private urlListId = signal<string>('');
  private taskData = signal<any>('');
  taskObj: any;

  ngOnInit() {
    //grab list id from url
    this.router.params.subscribe((prm) => {
      this.urlListId.set(prm['id']);
    })

    //grab all tasks (in a list) from api and store in shared service
    this.listSvc.SingleList(this.urlListId()).subscribe((data: any) => {
      this.sharedSvc.transmitListData(data.taskItems);
    })

  }

  onNotify() {
    //when notified of new info, grab data from shared service
    this.sharedSvc.currentChildData$.subscribe((data) => {
      this.taskData.set(data);
    }).unsubscribe();

    //create task
    this.taskObj = {
      title: this.taskData().title,
      dueDate: this.taskData().dueDate,
      priority: this.taskData().priority,
      parentTaskId: this.taskData().parentTaskId,
      listId: this.urlListId()
    };

    //api call to post task creation
    this.taskSvc.postTask(this.taskObj).subscribe((data) => {
      console.log("Task created and posted successfully!");
      console.log(data);
    })
  }
}
