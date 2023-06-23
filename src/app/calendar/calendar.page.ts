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
  // Declaración de las constantes con las credenciales y configuraciones de la API de Google Calendar
  private readonly CLIENT_ID = '428884575058-41vkl257en3gqom63vsbod91gp0ou4k9.apps.googleusercontent.com';
  private readonly API_KEY = 'AIzaSyC8aFn4uCvdrXr0rUJPrbNGxVU6UIYIsRA';
  private readonly DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  private readonly SCOPES = 'https://www.googleapis.com/auth/calendar';

  // Variable para controlar la inicialización de gapi
  private gapiInited = false;
  private tokenClient: any;


  constructor() {
    this.loadGapi();
  }
 // Método para cargar la API de gapi
  private loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client', this.initializeGapiClient.bind(this));
    };
    document.body.appendChild(script);
  }
  // Método para inicializar el cliente de gapi
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
// Método para habilitar/deshabilitar los botones según la autenticación del usuario
  private maybeEnableButtons() {
    if (this.gapiInited) {
      // Aquí puedes manipular la visibilidad de los botones según la autenticación del usuario
    }
  }
 // Método para autorizar y obtener el token de acceso
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
 // Método para cerrar sesión y revocar el token de acceso
  public async signOut(): Promise<void> {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
    }
    // Aquí puedes realizar acciones después de cerrar sesión
  }
  public async createCalendarEvent(event: any): Promise<any> {
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'calendaap@gmail.com',
        resource: event,
      });
      console.log('Evento creado exisitosamente:', response.result);
      return response.result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
    // Método para crear un nuevo evento en Google Calendar

  public async getCalendarEvents(): Promise<any[]> {
    try {
      // Obtener la fecha y hora actual
      const currentDate = new Date();
  
      // Establecer la fecha y hora mínima para obtener eventos
      const timeMin = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0).toISOString();
  
      const response = await gapi.client.calendar.events.list({
        calendarId: 'calendaap@gmail.com',
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
  public async submitForm(eventDetails: any): Promise<void> {
    try {
      const newEvent = {
        summary: eventDetails.summary,
        description: eventDetails.description,
        location: eventDetails.location,
        start: {
          dateTime: eventDetails.startTime,
        },
        end: {
          dateTime: eventDetails.endTime,
        },
      };

      const createdEvent = await this.createCalendarEvent(newEvent);
      console.log('Evento creado:', createdEvent);

      // Realiza otras acciones después de crear el evento, si es necesario
    } catch (err) {
      console.error('Error al crear el evento:', err);
      // Maneja el error según sea necesario
    }
  }
}
