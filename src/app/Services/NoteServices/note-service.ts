import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserTokenService } from '../UserToken/user-token.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);
    private userIdTokenService = inject(UserTokenService);
  
  // private baseUrl = 'https://localhost:7177/notes';
   
  // createNote(taskId: string, note: string) {
  //   return this.http.post<any>(this.baseUrl + taskId, {}, { headers: this.makeApiHeader() });
  // }

  createNote(taskId: string, noteText: string){
    const url =  `https://localhost:7177/Task/${taskId}/notes`;
   return this.http.post<any>(url,
       { noteText }, { headers: this.makeApiHeader() });
  } 

  private makeApiHeader(): HttpHeaders {
    return new HttpHeaders({
      UserId: this.userIdTokenService.GetUserIdToken() ?? (() => { throw new Error("User ID Token is null"); })()
    });
  }


}
