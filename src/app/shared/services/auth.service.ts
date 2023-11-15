import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  decodeJwt(token: string){
    if(token) {
       const decoded: any = jwt_decode(token);
       localStorage.setItem('token', token);
       localStorage.setItem('user', JSON.stringify(decoded?.user))
    }
   
  }

  getAuthToken(): string {
    return localStorage.getItem('token') || ''
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.clear()
  }
}
