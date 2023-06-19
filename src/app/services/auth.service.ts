import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { GoogleCalendarService } from './google-calendar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$ = authState(this.afAuth);

  constructor(
    private afAuth: Auth,
    private googleCalendarService: GoogleCalendarService,
    
  ) { }

  async register(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await signInWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(this.afAuth, provider);
      const googleUser = result.user;
      if (googleUser) {
        const token = await googleUser.getIdToken();

        console.log(token);
        // Aquí puedes utilizar el token de acceso para realizar solicitudes a la API de Google Calendar
        this.googleCalendarService.getEvents(token)
          .subscribe(
            (response) => {
              // Manejar la respuesta de los eventos de Google Calendar
            },
            (error) => {
              // Manejar el error de la solicitud a la API de Google Calendar
            }
          );
      }
    } catch (error) {
      // Manejar el error de la autenticación con Google
    }
  }

  logout() {
    return signOut(this.afAuth);
  }
}
