import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetTaskDetailsService {
  private http = inject(HttpClient);
  private taskId = '24B6895A-1A00-4858-B6D7-0B876C8BCF1C';//'938F140C-7A61-49E0-95DC-F4274D49A4C1';
  private header = new HttpHeaders ({
    UserId: '8051A558-6F25-409B-9823-D5F5603EE625'//'B631308C-A4D6-4BBD-A935-3B6A10D2D52D'
  });
  private apiUrl = 'https://localhost:7177/Task/' + this.taskId; /// {this.header};

  getTaskDetails()  {
    return this.http.get( this.apiUrl, { headers : this.header} );
  }
}
