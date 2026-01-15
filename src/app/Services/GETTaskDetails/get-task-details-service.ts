import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetTaskDetailsService {
  private http = inject(HttpClient);
  private header = new HttpHeaders ({
    UserId: '8051A558-6F25-409B-9823-D5F5603EE625'
  });
  private apiUrl = 'https://localhost:7177/Task/'; 

  getTaskDetails(taskId: string)  {
    return this.http.get( this.apiUrl + taskId, { headers : this.header} );
  }
}
