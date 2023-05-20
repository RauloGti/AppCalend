import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: Auth
  ) { }

  async register(email: string, password: string){
    const user = await createUserWithEmailAndPassword(this.afAuth, email,password);
    return await signInWithEmailAndPassword(this.afAuth,email,password);
  }

  login(email:string, password: string){
  return  signInWithEmailAndPassword(this.afAuth,email,password);
  }
  logout(){
    return signOut(this.afAuth);
  }
}

