import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, getFirestore, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { google } from 'googleapis';


declare var gapi: any;
declare var google2: any;
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-assignturn',
  templateUrl: './assignturn.page.html',
  styleUrls: ['./assignturn.page.scss'],
})


export class AssignturnPage implements OnInit {

  pacienteSeleccionado: any;
    selectedDate: string = '';
    selectedTime: string = '';
    Turno: string =''; 
    createdEvent: any;
    tiempo:any;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private firestore: Firestore
              ) {
                this.loadGapi();
                
              }
    private readonly CLIENT_ID = '428884575058-41vkl257en3gqom63vsbod91gp0ou4k9.apps.googleusercontent.com';
    private readonly API_KEY = 'AIzaSyC8aFn4uCvdrXr0rUJPrbNGxVU6UIYIsRA';
    private readonly DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    private readonly SCOPES = 'https://www.googleapis.com/auth/calendar';
  
    // Variable para controlar la inicialización de gapi
    private gapiInited = false;
    private tokenClient: any;
    
    async ngOnInit() {
      const pacienteId = this.route.snapshot.paramMap.get('pacienteId');
      if (pacienteId) {
        try {
          const db = getFirestore();
          const docRef = doc(db, 'Idpaciente', pacienteId);
          const docSnapshot = await getDoc(docRef);
          console.log(this.pacienteSeleccionado)
          if (docSnapshot.exists()) {
            const datos = docSnapshot.data();
            this.pacienteSeleccionado = {
              id: docSnapshot.id,
              nombre: datos['nombre'],
              apellido: datos['apellido'],
              correo: datos['correo'],
              dni: datos['dni'],
              numero: datos['telefono'],
              edad: datos['edad'],
              anotador: datos['anotador']
            };
            
          } else {
            console.log('No se encontró el paciente con el ID:', pacienteId);
            // Maneja el caso cuando no se encuentra el paciente en la base de datos
          }
        } catch (error) {
          console.log('Error al obtener los datos del paciente:', error);
          // Maneja el error al obtener los datos del paciente
        }
      } else {
        console.log('No se proporcionó el pacienteId');
        // Maneja el caso cuando no se proporciona el pacienteId
      }
    }
    
    private loadGapi() {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        gapi.load('client', this.initializeGapiClient.bind(this));
      };
      document.body.appendChild(script);
    }
    private gisLoaded() {
      this.tokenClient = google2.accounts.oauth2.initTokenClient({
        client_id: this.CLIENT_ID,
        scope: this.SCOPES,
        callback: '', // defined later
      });
      this.maybeEnableButtons();
    }
    // private initializeGapiClient() {
    //   gapi.client.init({
    //     apiKey: this.API_KEY,
    //     discoveryDocs: [this.DISCOVERY_DOC],
    //   }).then(() => {
    //     this.gapiInited = true;
    //     this.maybeEnableButtons();
    //   });
    // }

    private initializeGapiClient() {
      gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: [this.DISCOVERY_DOC],
      }).then(() => {
        this.gapiInited = true;
        this.maybeEnableButtons();
        gapi.load('auth2', this.initializeGapiAuth.bind(this)); // Agrega esta línea para cargar gapi.auth2
      });
    }

    private initializeGapiAuth() {
      gapi.auth2.init({
        client_id: this.CLIENT_ID,
        scope: this.SCOPES
      }).then(() => {
        this.gisLoaded(); // Llama a la función gisLoaded después de que se inicialice gapi.auth2
      }).catch((error: any) => {
        console.error('Error al inicializar gapi.auth2:', error);
        throw error;
      });
    }

    private maybeEnableButtons() {
      if (this.gapiInited) {
        gapi.load('auth2', () => {
          gapi.auth2.init({
            client_id: this.CLIENT_ID,
            scope: this.SCOPES,
          }).then(() => {
            // La inicialización de gapi.auth2 fue exitosa
            console.log('gapi.auth2 inicializado correctamente');
            // Aquí puedes manipular la visibilidad de los botones según la autenticación del usuario
          }).catch((error: any) => {
            // Error al inicializar gapi.auth2
            console.error('Error al inicializar gapi.auth2:', error);
          });
        });
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

    saveEvent() {
      const summary= this.pacienteSeleccionado.nombre +' '+this.pacienteSeleccionado.apellido;
      const eventDetails = {
        summary: summary,
        
        start: {
          dateTime: this.turno,
        },
        end: {
          dateTime: this.turno,
        },
      };
  
      // Llama al método createCalendarEvent() con los detalles del evento
      this.createCalendarEvent(eventDetails);
    }

    // async  createCalendarEvent(event: any) {
    //   try {
    //     const response = await gapi.client.calendar.events.insert({
    //       calendarId: 'calendaap@gmail.com',
    //       resource: event,
    //     });
    
    //     console.log('Evento creado exitosamente:', response.result);
    //     // Aquí puedes realizar acciones adicionales después de crear el evento en el calendario
    //   } catch (error) {
    //     console.error('Error al crear el evento:', error);
    //     throw error;
    //   }
    // }

    async createCalendarEvent(event: any) {
      try {
        const authInstance = gapi.auth2.getAuthInstance();
        if (!authInstance) {
          throw new Error('No se pudo obtener la instancia de autenticación.');
        }
        
        const user = authInstance.currentUser.get();
        if (!user) {
          throw new Error('No se pudo obtener el usuario actual.');
        }
        
        const authResponse = user.getAuthResponse();
        const token = authResponse.access_token;
    
        const response = await gapi.client.request({
          path: 'https://www.googleapis.com/calendar/v3/calendars/calendaap@gmail.com/events',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: event,
        });
    
        console.log('Evento creado exitosamente:', response.result);
        // Aquí puedes realizar acciones adicionales después de crear el evento en el calendario
      } catch (error) {
        console.error('Error al crear el evento:', error);
        throw error;
      }
    }

    // async createCalendarEvent(event: any): Promise<void> {
    //   try {
    //     if (gapi.client.calendar && gapi.client.calendar.events) {
    //       const response = await gapi.client.calendar.events.insert({
    //         calendarId: 'calendaap@gmail.com',
    //         resource: event,
    //       });
    //       console.log(response);
    //       console.log('Evento creado exitosamente:', response.result);
    //       this.createdEvent = response.result;
    //       // Aquí puedes realizar acciones adicionales después de crear el evento en el calendario
    //     } else {
    //       console.error('No se puede acceder a la propiedad "calendar.events".');
    //     }
        
    //   } catch (err) {
    //     console.error(err);
    //     throw err;
    //   }
    // }
    // async createCalendarEvent(event: any): Promise<void> {
    //   try {
    //     const response = await gapi.client.calendar.events.insert({
    //       calendarId: 'calendaap@gmail.com',
    //       resource: event,
    //     });
  
    //     console.log('Evento creado exitosamente:', response.result);
    //     this.createdEvent = response.result;
    //     // Aquí puedes realizar acciones adicionales después de crear el evento en el calendario
  
    //   } catch (err) {
    //     console.error(err);
    //     throw err;
    //   }
    // }
    
    getSelectedDateTime(): string {
      // Crea un objeto Date con la fecha y hora especificadas
      const selectedDateTime = new Date('2023-06-28T03:00:00');
    
      // Retorna la fecha y hora en formato ISO 8601
      return selectedDateTime.toISOString();
    }
    // getSelectedDateTime(): string {
    //   // Combina la fecha y la hora seleccionadas en un solo objeto Date
    //   //const selectedDateTime = new Date(this.selectedDate + ' ' + this.selectedTime);
  
    //   // Retorna la fecha y hora en formato ISO 8601
    //   return this.Turno;
    // }
    //turno basico de prueba que muestra en pantalla lo seleccionado para probar tipos de dato de ingreso
    turno() {
      console.log('Fecha seleccionada:', this.Turno); 
    }
    
  }
  
  /*implementando funcion de agregar campos de titulo evento y demas
  import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignturn',
  templateUrl: './assignturn.page.html',
  styleUrls: ['./assignturn.page.scss'],
})
export class AssignturnPage {
  selectedDate: string = '';
  selectedTime: string = '';
  eventTitle: string = '';
  eventDescription: string = '';
  eventLocation: string = '';

  constructor() {}

  saveEvent() {
    const eventDetails = {
      summary: this.eventTitle,
      description: this.eventDescription,
      location: this.eventLocation,
      start: {
        dateTime: this.getSelectedDateTime(),
      },
      end: {
        dateTime: this.getSelectedDateTime(),
      },
    };

    console.log('Datos del formulario:', {
      eventTitle: this.eventTitle,
      eventDescription: this.eventDescription,
      eventLocation: this.eventLocation,
    });

    console.log('Datos del calendario:', eventDetails);

    // Llama al método createCalendarEvent() con los detalles del evento
    this.createCalendarEvent(eventDetails);
  }

  createCalendarEvent(event: any) {
    // Implementa la lógica para crear el evento en google2 Calendar
    // utilizando el método createCalendarEvent() que hemos mencionado anteriormente
  }

  getSelectedDateTime(): string {
    // Combina la fecha y la hora seleccionadas en un solo objeto Date
    const selectedDateTime = new Date(this.selectedDate + ' ' + this.selectedTime);

    // Retorna la fecha y hora en formato ISO 8601
    return selectedDateTime.toISOString();
  }
}
*/