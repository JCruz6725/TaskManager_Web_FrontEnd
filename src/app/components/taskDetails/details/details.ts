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
  public currentTaskDate = signal<any>(null);
  public currentTaskParent = signal<any>(null);

  ngOnInit() {
    this.http.getTaskDetails('24B6895A-1A00-4858-B6D7-0B876C8BCF1C').subscribe((res:any) => {
      this.currentTask.set(res);
      
      if (this.currentTask().dueDate != null){
        this.currentTaskDate.set(new Date(this.currentTask().dueDate));
      }
      else{
        this.currentTaskDate.set('No Current Due Date');
      }

      this.http.getTaskDetails(this.currentTask().parentId).subscribe((res:any) => {
        this.currentTaskParent.set(res);
      })

    })
    
    
  }

  onParentTaskClick(){
    
  }

}
