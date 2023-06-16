/*import { Injectable } from '@angular/core';
import { google, calendar_v3 } from 'googleapis';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private authClient: any;

  constructor() {
    // Configurar las credenciales de autenticación
    const credentials = {
      // Agrega aquí tus credenciales de autenticación obtenidas de Google
      client_id: 'T428884575058-adu88dh2t8r2a19ote2h468opfo26htj.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'http://localhost:8101/home',
      refresh_token: 'TU_REFRESH_TOKEN'
    };

    // Configurar el cliente de autenticación
    this.authClient = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uri
    );

    // Establecer el token de actualización (refresh token)
    this.authClient.setCredentials({
      refresh_token: credentials.refresh_token
    });
  }

  // Método para obtener los eventos del calendario
  getEvents(): Observable<calendar_v3.Schema$Event[]> {
    const calendar = google.calendar({ version: 'v3', auth: this.authClient });

    try {
      // Realizar la solicitud para obtener los eventos y convertir la Promise en un Observable
      return from(calendar.events.list({
        calendarId: 'calendaap@gmail.com'
      })).pipe(
        map((response: any) => response.data.items)
      );
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
      throw error;
    }
  }
}
*/