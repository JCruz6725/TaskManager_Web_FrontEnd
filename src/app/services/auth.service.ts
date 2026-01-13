import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegisterUser } from "../models/register-user";

@Injectable({  providedIn: 'root'})
export class UserAuthService {
//   private http = Inject(HttpClient);
 constructor(private http: HttpClient) {}
private baseUrl = 'https://localhost:7177/'; 

    registerUser(user: RegisterUser) {
        return this.http.post(`${this.baseUrl}user`, user);
    }
    


}


