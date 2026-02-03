import { Injectable, inject } from '@angular/core';
import { RequestHelperService } from '../BaseService/request-helper-service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private Service = inject(RequestHelperService)

  getTask(taskId: string){
    return this.Service.get<any>('/task/' + taskId);
  }


  deleteTask(taskId: string){
    return this.http.delete<any>(this.getTaskByIdUrl + taskId, { headers: this.MakeApiHeader() })
  }

  postTask(task: any){
    return this.Service.post<any>('/task', task);
    }
   }

