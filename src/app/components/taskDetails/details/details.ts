import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { taskDetails } from '../../../models/taskDetails.type';
import { GetTaskDetailsService } from '../../../services/GETTaskDetails/get-task-details-service';
import { inject } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  http: GetTaskDetailsService = inject(GetTaskDetailsService);

  public currentTask = signal<any>(null);
  public currentTaskDate = signal<any>('No Current Due Date');

  ngOnInit() {
    this.http.getTaskDetails().subscribe((res:any) => {
      this.currentTask.set(res);
      if (this.currentTask().dueDate != null){
        this.currentTaskDate.set(new Date(this.currentTask().dueDate));
      }
    })
  }
}
