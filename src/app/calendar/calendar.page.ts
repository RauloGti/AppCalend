import { Injectable } from '@angular/core';
import { Component } from '@angular/core';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})

export class CalendarPage {
  private readonly CLIENT_ID = '428884575058-41vkl257en3gqom63vsbod91gp0ou4k9.apps.googleusercontent.com';
  private readonly API_KEY = 'AIzaSyC8aFn4uCvdrXr0rUJPrbNGxVU6UIYIsRA';
  private readonly DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  private readonly SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  private gapiInited = false;
  private tokenClient: any;


  constructor() {
    this.loadGapi();
  }

  private loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client', this.initializeGapiClient.bind(this));
    };
    document.body.appendChild(script);
  }

  private initializeGapiClient() {
    gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    }).then(() => {
      this.gapiInited = true;
      this.maybeEnableButtons();
    });
  }

  private gisLoaded() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '', // defined later
    });
    this.maybeEnableButtons();
  }

  private maybeEnableButtons() {
    if (this.gapiInited) {
      // Aquí puedes manipular la visibilidad de los botones según la autenticación del usuario
    }
  }

  public async authorize(): Promise<void> {
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      // Aquí puedes realizar acciones después de la autorización exitosa
    };

    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      this.tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  public async signOut(): Promise<void> {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
    }
    // Aquí puedes realizar acciones después de cerrar sesión
  }

  public async getCalendarEvents(): Promise<any[]> {
    try {
      // Obtener la fecha y hora actual
      const currentDate = new Date();
  
      // Establecer la fecha y hora mínima para obtener eventos
      const timeMin = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0).toISOString();
  
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin,
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      });
      console.log(response)
      const events = response.result.items || [];
      return events;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  
  
  
  
  
  

}
