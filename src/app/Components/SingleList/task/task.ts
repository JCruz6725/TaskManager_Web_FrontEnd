import { Component, input, inject } from '@angular/core';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  imports: [DatePipe, MatIconModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  apiService : TaskService = inject(TaskService);
  taskId = input<string>("");
  status : any;
  errorMessage : any;

  taskName = signal<string>("");
  taskDueDate = signal<any>(null);

  ngOnInit(){
    this.apiService.getTask(this.taskId()).subscribe((res:any)=>{
      this.taskName.set(res.title);
      this.taskDueDate.set(new Date(res.dueDate));
    });
  }

}
