import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegisterUser } from "../models/register-user";
import { LoginUser } from "../models/login-user";

@Injectable({  providedIn: 'root'})
export class UserAuthService {
//   private http = Inject(HttpClient);
 constructor(private http: HttpClient) {}
private baseUrl = 'https://localhost:7177/'; 

    registerUser(userRegister: RegisterUser) {
        return this.http.post(`${this.baseUrl}user`, userRegister);
    }
    
    // loginUser(userLogin: { email: string; password: string }) {
    //     return this.http.post(`${this.baseUrl}user/login`, userLogin);
    // }

     loginUser(userLogin: LoginUser){
        return this.http.post(`${this.baseUrl}user/login`, userLogin);
    }


}


