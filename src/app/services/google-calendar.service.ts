import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private apiUrl = 'https://www.googleapis.com/calendar/v3';

  constructor(private http: HttpClient) { }

  getEvents(accessToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${this.apiUrl}/events`, { headers });
  }

  // Otros métodos para interactuar con la API de Google Calendar
  
}
