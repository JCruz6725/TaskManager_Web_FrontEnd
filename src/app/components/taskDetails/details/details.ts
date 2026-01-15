import { Component, inject, signal, input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { GetTaskDetailsService } from '../../../services/GETTaskDetails/get-task-details-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  taskId = input<string>('');
  http: GetTaskDetailsService = inject(GetTaskDetailsService);

  public currentTask = signal<any>(null);
  public currentTaskDate = signal<any>(null);
  public currentTaskParent = signal<any>(null);

  ngOnInit() {
    this.currentTask.set(res);
    
    if (this.currentTask().dueDate != null){
      this.currentTaskDate.set(new Date(this.currentTask().dueDate));
    }
    else{
      this.currentTaskDate.set('No Current Due Date');
    }


    
    // this.http.getTaskDetails('24B6895A-1A00-4858-B6D7-0B876C8BCF1C').subscribe((res:any) => {
    //   this.http.getTaskDetails(this.currentTask().parentId).subscribe((res:any) => {
    //     this.currentTaskParent.set(res);
    //   })
    // });
  }

  onParentTaskClick(){

  }

}
