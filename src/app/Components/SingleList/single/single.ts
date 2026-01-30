import { ListService } from './../../../Services/ListServiceAll/get-all-list';
import { Component, EventEmitter, inject, signal , OnInit,input,Output} from '@angular/core';;
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Task } from '../task/task';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../../Services/TaskServices/task-service';



@Component({
  selector: 'app-single',
  imports: [CommonModule, MatIcon, RouterLink, Task, MatToolbarModule, MatMenuModule, FormsModule, MatFormFieldModule],
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
  service = inject(ListService);
  listId = signal<string>('');

  @Output('getAllList') getAllList: EventEmitter<any> = new EventEmitter();

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
  }

}
