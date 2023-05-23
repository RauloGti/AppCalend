import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUser: string = '';

  setLoggedInUser(name: string) {
    this.loggedInUser = name;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }
}
