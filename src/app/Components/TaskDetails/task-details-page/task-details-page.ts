import { Component, inject, Signal, signal, } from '@angular/core';
import { Details } from '../details/details';
import { GetTaskDetailsService } from '../../../Services/GETTaskDetails/get-task-details-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-details-page',
  imports: [Details],
  templateUrl: './task-details-page.html',
  styleUrl: './task-details-page.css',
})
export class TaskDetailsPage {
  //public task = signal<any| null>(null);
  public task : any| null = null;
private svc = inject(GetTaskDetailsService)
private router = inject(ActivatedRoute)

private sub : Subscription | null = null

ngOnInit () {
  let id : string = "";

  this.router.params.subscribe(
  (prm) => {
    id = prm['id']


  }


  )

  
  console.log(id)


  this.svc.getTaskDetails(id).subscribe((res : any) => 
    {
      this.task = res ;

     
    })
  }
}
