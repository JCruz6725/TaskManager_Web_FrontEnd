import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserTokenService } from '../UserToken/user-token.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private http = inject(HttpClient);
  private userIdTokenService = inject(UserTokenService)

  AllList(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7177/list', { headers: this.MakeApiHeader() });
  }

  SingleList(listId: string | undefined): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7177/list/'+ listId, { headers: this.MakeApiHeader() });
  }

  MakeApiHeader(): HttpHeaders {
    return new HttpHeaders({
      UserId: this.userIdTokenService.GetUserIdToken() ?? (() => { throw new Error("User ID Token is null"); })()
    });
  }

  CreateList(inputValue: string | undefined): Observable<any> {
    const body = { name: inputValue };
    return this.http.post<any>('https://localhost:7177/list', body, { headers: this.MakeApiHeader() });
  }
  UpdateList(listId: string | undefined, inputValue: string | undefined): Observable<any[]> {
    const body ={ title : inputValue };
    return this.http.put<any[]>('https://localhost:7177/list/' + listId + '/edit-list', body, { headers: this.MakeApiHeader() });
  }
  DeleteList(listId: string | undefined): Observable<any[]> {
    return this.http.delete<any[]>('https://localhost:7177/list/' + listId , { headers: this.MakeApiHeader() });
  }

  MoveTask(inputlistId: string, inputtaskId: string):any{
    const body = {taskId: inputtaskId};
    return this.http.post('https://localhost:7177/list/' + inputlistId + '/move-task', body, { headers: this.MakeApiHeader()})
  }
}
