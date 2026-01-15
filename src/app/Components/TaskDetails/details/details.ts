import { Component, inject, signal, input, SimpleChange } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GetTaskDetailsService } from '../../../Services/GETTaskDetails/get-task-details-service';


@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public task = input<any>();
  //http: GetTaskDetailsService = inject(GetTaskDetailsService);

  public currentTask = signal<any>(null);
  public currentTaskDate = signal<any>(null);
  public currentTaskParent = signal<any>(null);

  ngOnInit() {
    if( this.task() == null ) {
      throw new Error("task is null")
    }

    console.log("From Child") 
    console.log(this.task()); 
    //console.log(changes.firstChange); 
     
    

//if(changes.currentValue.task) {


  //}

    //console.log("1", changes.task())
    

    //console.log("2",chg.currentValue.task)


    // this.currentTask.set(this.task());
    
    // if (this.currentTask().dueDate != null){
    //   this.currentTaskDate.set(new Date(this.currentTask().dueDate));
    // }
    // else{
    //   this.currentTaskDate.set('No Current Due Date');
    // }


    
    // this.http.getTaskDetails('24B6895A-1A00-4858-B6D7-0B876C8BCF1C').subscribe((res:any) => {
    //   this.http.getTaskDetails(this.currentTask().parentId).subscribe((res:any) => {
    //     this.currentTaskParent.set(res);
    //   })
    // });
  }



}
interface aTask{
  something : any


}
