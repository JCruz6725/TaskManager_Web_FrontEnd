import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestHelperService } from '../BaseService/request-helper-service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private Service = inject(RequestHelperService)

  AllList(): Observable<any[]> {
    return this.Service.get<any[]>('/list');
  }

  SingleList(listId: string | undefined): Observable<any[]> {
    return this.Service.get<any[]>('/list/' + listId);
  }

  CreateList(inputValue: string | undefined): Observable<any> {
       return this.Service.post<any>('/list', { name: inputValue });
  }

  UpdateList(listId: string | undefined, inputValue: string | undefined): Observable<any[]> {
    return this.Service.put<any[]>('/list/' + listId + '/edit-list', { title: inputValue });
  }

  DeleteList(listId: string | undefined): Observable<any[]> {
    return this.Service.delete<any[]>('/list/' + listId);
  }

  MoveTask(inputlistId: string, inputtaskId: string):any{
    const body = {taskId: inputtaskId};
    return this.http.post('https://localhost:7177/list/' + inputlistId + '/move-task', body, { headers: this.MakeApiHeader()})
  }
}
