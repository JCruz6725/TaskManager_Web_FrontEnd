import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  private UserIdToken: string | null = null;

  SetUserIdToken(token : string) { 
    this.UserIdToken = token;
  }

  GetUserIdToken() : string | null { 
    return this.UserIdToken;
  }
}
