import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserTokenService } from '../UserToken/user-token.service';
import { RequestHelperService } from '../BaseService/request-helper-service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private http = inject(HttpClient);
  // private userIdTokenService = inject(UserTokenService)
  private Service = inject(RequestHelperService)


  AllList(): Observable<any[]> {

    return this.Service.get<any[]>('/list');

    //return this.http.get<any[]>('https://localhost:7177/list', { headers: this.MakeApiHeader() });
  }

  SingleList(listId: string | undefined): Observable<any[]> {
    return this.Service.get<any[]>('/list/' + listId);
    // return this.http.get<any[]>('https://localhost:7177/list/'+ listId, { headers: this.MakeApiHeader() });
  }

  // MakeApiHeader(): HttpHeaders {
  //   return new HttpHeaders({
  //     UserId: this.userIdTokenService.GetUserIdToken() ?? (() => { throw new Error("User ID Token is null"); })()
  //   });
  // }

  CreateList(inputValue: string | undefined): Observable<any> {

       return this.Service.post<any>('/list', { name: inputValue });
     //  const body = { name: inputValue };
    // return this.http.post<any>('https://localhost:7177/list', body, { headers: this.MakeApiHeader() });
  }
  UpdateList(listId: string | undefined, inputValue: string | undefined): Observable<any[]> {
    return this.Service.put<any[]>('/list/' + listId + '/edit-list', { title: inputValue });
    // const body ={ title : inputValue };
    // return this.http.put<any[]>('https://localhost:7177/list/' + listId + '/edit-list', body, { headers: this.MakeApiHeader() });
  }
  DeleteList(listId: string | undefined): Observable<any[]> {
    return this.http.delete<any[]>('https://localhost:7177/list/' + listId , { headers: this.MakeApiHeader() });
  }
}
