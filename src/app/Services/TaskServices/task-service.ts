import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserTokenService } from '../UserToken/user-token.service';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private userIdTokenService = inject(UserTokenService);
  private getTaskByIdUrl = 'https://localhost:7177/task/';

  getTask(taskId: string){
    return this.http.get<any>(this.getTaskByIdUrl + taskId, { headers: this.MakeApiHeader() });
  }

  MakeApiHeader(): HttpHeaders {
    return new HttpHeaders({
      UserId: this.userIdTokenService.GetUserIdToken() ?? (() => { throw new Error("User ID Token is null"); })()
    });
  }
}
