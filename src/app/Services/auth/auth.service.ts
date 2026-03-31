// import { ExtraInfo } from './../../Models/extra-info/extra-info';
import { Injectable , inject} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegisterUser } from "../../Models/register-user";
import { LoginUser } from "../../Models/login-user";
import { ResetPassword } from "../../Models/reset-password";
import { ExtraInfoComponent } from "../../Components/Profile/ExtraInfoComponent/extra-info-component";
import { RequestHelperService } from "../BaseService/request-helper-service";

@Injectable({ providedIn: 'root' })
export class UserAuthService {
    constructor(private http: HttpClient) { }
    private baseUrl = 'https://localhost:7177/';
    private Service = inject(RequestHelperService)

    registerUser(userRegister: RegisterUser) {
        return this.http.post(`${this.baseUrl}user`, userRegister);
    }

    loginUser(userLogin: LoginUser) {
        return this.http.post(`${this.baseUrl}user/login`, userLogin);
    }

    resetPassword(resetPsw: ResetPassword) {
        return this.http.post(`${this.baseUrl}user/reset`, resetPsw)
    }

    postProfileUser(extraInfo: ExtraInfo) {
      return this.Service.post<any>('/user/extrainfo/' + userid, extraInfo);

    }

}


