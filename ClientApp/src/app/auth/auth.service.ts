import { Injectable } from '@angular/core';
import { UserRm } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser?: UserRm;
  admin = false;

  loginUser(user: UserRm) {
    console.log("Log in the user with email " + user.email)
    this.currentUser = user
  }
}
