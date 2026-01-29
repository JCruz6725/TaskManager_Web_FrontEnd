import { HttpHeaders, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestHelperService {
  private UserIdToken: string | null = null;
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7177';

  SetUserIdToken(token: string) {
    this.UserIdToken = token;
  }
  GetUserIdToken(): string | null {
    return this.UserIdToken;
  }
  MakeApiHeader(): HttpHeaders {
    return new HttpHeaders({
      UserId:
        this.GetUserIdToken() ??
        (() => {
          throw new Error('User ID Token is null');
        })(),
    });
  }
  get<T>(url: string) {
    if (this.UserIdToken === null) {
      return this.http.get<T>(`${this.baseUrl}${url}`);
    }
    return this.http.get<T>(`${this.baseUrl}${url}`, { headers: this.MakeApiHeader() });
  }
  post<T>(url: string, body: any) {
    if (this.UserIdToken === null) {
      return this.http.get<T>(`${this.baseUrl}${url}`);
    }
    return this.http.post<T>(`${this.baseUrl}${url}`, body, { headers: this.MakeApiHeader() });
  }
  put<T>(url: string, body: any) {
    if (this.UserIdToken === null) {
      return this.http.get<T>(`${this.baseUrl}${url}`);
    }
    return this.http.put<T>(`${this.baseUrl}${url}`, body, { headers: this.MakeApiHeader() });
  }
  delete<T>(url: string) {
    if (this.UserIdToken === null) {
      return this.http.get<T>(`${this.baseUrl}${url}`);
    }
    return this.http.delete<T>(`${this.baseUrl}${url}`, { headers: this.MakeApiHeader() });
  }
}
