import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserTokenService } from '../UserToken/user-token.service';
import { signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private userIdTokenService = inject(UserTokenService);
  private getTaskByIdUrl = 'https://localhost:7177/Task/';

  private header = new HttpHeaders ({
    UserId: '8051A558-6F25-409B-9823-D5F5603EE625'
  });

  getTask(taskId: string){
    return this.http.get<any>(this.getTaskByIdUrl + taskId, { headers: this.header/*this.MakeApiHeader()*/ });
  }

  MakeApiHeader(): HttpHeaders {
    return new HttpHeaders({
      UserId: this.userIdTokenService.GetUserIdToken() ?? (() => { throw new Error("User ID Token is null"); })()
    });
  }

  
}