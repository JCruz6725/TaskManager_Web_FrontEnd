import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private http = inject(HttpClient);
  private headers = new HttpHeaders({
    UserId: '2157303F-4E90-4E43-82B0-AE93C44D85ED'
  });

  AllList(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7177/list', { headers: this.headers });
  }
   SingleList(listId:string|undefined): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7177/list/'+ listId, { headers:this.headers });
  }

}

