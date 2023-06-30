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
  events: any[] = [];
  filterText: string = '';
  filteredEvents: any[] = []; // Propiedad para almacenar los eventos filtrados
  searchTerm: string = '';
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
 
  /*@function loadGapi
  @description
  *se crea un script con document.createElement(), termina creando un scrip en el HTML
  * asigna la url de la api de google calendar al scrip.src
  * cuando se ejecuta el scrip llama a la funcion al contenido de la funcion onload
  * con gapi.load carga el cliente de la API de google
  *inserta el scrip y lo agrega al cuerpo del documento
  */
  private loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client', this.initializeGapiClient.bind(this));
    };
    document.body.appendChild(script);
  }

  /*@initializeGapiClient
  @descripcion
  *se  usa gapi.clienti.init() para inicializar al cliente de la api de google
  *se pasan dos propiedades apikey y discoveryDocs y se les asignan API_KEY y DISCOVERY_DOC respectivamente
  *despues establece el gapiInited en true
  *llamala funcion maybeEnableButtons()
  */
  private initializeGapiClient() {
    gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    }).then(() => {
      this.gapiInited = true;
      this.maybeEnableButtons();
    });
  }

  /*@funcion mayEnableButtons
@descripcion 
*evalua si el exite y no es null el gapiInited
*/
  private maybeEnableButtons() {
    if (this.gapiInited) {
      // Aquí puedes manipular la visibilidad de los botones según la autenticación del usuario
    }
  }
 
  /*@function authorize
 @description
 *una vez que se complete el proceso de autorizacion y reciba un resp se el ejecuta la funcion de callback
 *se analiza si hay algun error en la resp y ocurrio lanza una exepcion
 *se hace una veridicacion para ver si se obtubo un token 
 *si el token es null se solicita de nuevo 
 *si ya se tiene el token se hace una solicitud vacia
 */
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
 
  /*@ function signOut
  @descripcion
  * se llama al token de acceso actual
  *se evalua si es null 
  * se revocan e invalida el token de acceso 
  * se elimina el token de acceso almacenado en el cliente de google
  */
  public async signOut(): Promise<void> {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
    }
    // Aquí puedes realizar acciones después de cerrar sesión
  }

  /*@ function getCalendarEvents
    @ descripcion
    *se crea una instacia de date()
    *se guarda en una varible una instancia de date() para obtener el año,mes,dia, hora minima en el formato ISOString
    *se usa gapi.client.calendar.events.list()para solicitar a la API de calendar los oventos del calendario 
    * se mandan diferentes parametros como el id del calendario , los maximos resultados o el orden 
    * se muestra response en consola
    * se le asigna a events los datos de response
    * *si hay algun error se captura y se muestra en consola, tambien se coloca el array de events como vacio

  
  */
    public async getCalendarEvents(): Promise<void> {
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
    
        console.log(response);
    
        this.events = response.result.items || []; // Asignar los eventos a la propiedad 'events'
    
      } catch (err) {
        console.error(err);
        this.events = []; // Manejar el error y asignar un arreglo vacío si es necesario
      }
    }
   
    /*@funtion applyfilter
      @descripcion
      *se usa filter() para crear una array de events con los elementos que cumplen con el filtro
      *se verifica por cada elemento que se haga bien el filtrado
      *si cumple con las condicion se agregan a filteredEvents
      */
   applyFilter() {
    this.filteredEvents = this.events.filter(event =>
      event.summary.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
