import { Component, input, inject } from '@angular/core';
import { TaskService } from '../../../Services/TaskServices/task-service';
import { signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task',
  imports: [DatePipe, MatIconModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  apiService : TaskService = inject(TaskService);
  taskId = input<string>("");

  taskName = signal<string>("");
  taskDueDate = signal<any>(null);
  tempDueDate:string = '';
  datePipe: any;

  ngOnInit(){
    this.apiService.getTask(this.taskId()).subscribe((res:any)=>{
      this.taskName.set(res.title);
      if (res.dueDate){
        //this.taskDueDate.set('HAS DUE DATE')
        this.taskDueDate.set((new Date(res.dueDate)).toLocaleDateString());
      }
      else{
        this.taskDueDate.set('No current due date')
      }
        
    });
  }

}
