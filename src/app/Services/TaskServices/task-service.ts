import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestHelperService } from '../BaseService/request-helper-service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private http = inject(HttpClient);
  private Service = inject(RequestHelperService)

  getTask(taskId: string){
    return this.Service.get<any>('/task/' + taskId);
  }
  postTask(task: any){
    return this.Service.post<any>('/task', task);
    }
   }

