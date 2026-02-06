import { ListService } from './../../../Services/ListServiceAll/get-all-list';
import { Component, EventEmitter, inject, signal , OnInit,input,Output} from '@angular/core';;
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../task/task';
import { RouterLink } from '@angular/router';
import { CdkDropList, CdkDragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VerifyDialog } from '../../verify-dialog/verify-dialog';
import { DataSharingService } from '../../../Services/TaskServices/DataSharingService/data-sharing-service';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-single',
  imports: [CommonModule, MatIcon, RouterLink, CdkDropList, CdkDrag, Task, MatToolbarModule, MatMenuModule, FormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule],
  templateUrl: './single.html',
  styleUrl: './single.css',
})
export class Single implements OnInit {
  dataID = input<string>();
  listSize = signal<any[]>([]);
  userSingleList = signal<any[]>([]);
  listname = signal<string>('');
  showErrorMessage = signal<boolean>(false);

  private taskSvc : TaskService = inject(TaskService);
  private sharedSvc : DataSharingService = inject(DataSharingService);
  service = inject(ListService);
  listId = signal<string>('');
  private subscription: any;

  @Output('getAllList') getAllList: EventEmitter<any> = new EventEmitter();
  @Output('updateLists') updateList: EventEmitter<any> = new EventEmitter();

  public State = signal<'view' | 'edit' | 'delete'>('view')

  ngOnInit(): void {
    this.getSingleList();
  }

  getSingleList() {
    this.service.SingleList(this.dataID()).subscribe((result: any) => {
      this.listname.set(result.name);
      this.listSize.set(result.taskItems);
      this.listId.set(result.id);
    });
  }

  flipState() {
    if (this.State() === 'view') {
      this.State.set('edit');
    }
    else if (this.State() === 'edit') {
      this.State.set('view');
    }
    else if (this.State() === 'delete') {
      this.State.set('view');
    }
  }

  UpdateList(): void {
    if (!this.listname() || this.listname().trim() === '') {
      this.showErrorMessage.set(true);
      console.log(' Error : Input is empty');
      return;
    }
    this.showErrorMessage.set(false);
    console.log('Entered Title Name: ', this.listname());

    this.service.UpdateList(this.dataID(), this.listname()).subscribe({
      next: (response) => {
        this.State.set('view');
      }
    });
  }
  DeleteList(): void {
    this.showErrorMessage.set(false);

    this.service.DeleteList(this.dataID()).subscribe({
      next: (response) => {
        this.State.set('view');
        this.getAllList.emit();
      },
      error: (err: { status: number; }) => {
        if (err.status === 400) {
          setTimeout(() => {
            this.showErrorMessage.set(false);
          }, 3000);
          this.showErrorMessage.set(true);
          return
        }
      }
    });
  }

  onTaskDelClick(taskId:string){
    this.taskSvc.deleteTask(taskId).subscribe((res:any) => {
      console.log("Deleted task " + res.title);
      this.getSingleList();
    })

    this.subscription.unsubscribe();
    this.sharedSvc.transmitDialogData({state: false, id: ''});
  }

  readonly dialog = inject(MatDialog)
  onDelDialog(taskId: string){
    const dialogRef = this.dialog.open(VerifyDialog, {
      data: {
        message: 'Delete task?',
        id: taskId
      }
    });

    this.subscription = this.sharedSvc.currentDialogData$.subscribe((res: {state: boolean, id: string}) => {
      if (res.state){
        this.onTaskDelClick(res.id);
      }
    })
  }


  drop(event: CdkDragDrop<any>){
    if (event.previousContainer.data !== event.container.data){
      this.service.MoveTask(event.container.data, event.item.data).subscribe((data:any) => {
        console.log("successfully moved task " + event.item.data + " from list " + event.previousContainer.data + " to list " + event.container.data);
        this.updateList.emit();
      })
    }
  }
}
