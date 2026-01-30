import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegisterUser } from "../../Models/register-user";
import { LoginUser } from "../../Models/login-user";

@Injectable({ providedIn: 'root' })
export class UserAuthService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:7177/';

  registerUser(userRegister: RegisterUser) {
    return this.http.post(`${this.baseUrl}user`, userRegister);
  }

  loginUser(userLogin: LoginUser) {
    return this.http.post(`${this.baseUrl}user/login`, userLogin);
  }
}


