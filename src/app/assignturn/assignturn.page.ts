import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignturn',
  templateUrl: './assignturn.page.html',
  styleUrls: ['./assignturn.page.scss'],
})

export class AssignturnPage {
    selectedDate: string = '';
    selectedTime: string = '';
    Turno: string | undefined; 
    constructor() {}
  
    
    saveEvent() {
      const eventDetails = {
        summary: 'Título del evento',
        description: 'Descripción del evento',
        location: 'Ubicación del evento',
        start: {
          dateTime: this.getSelectedDateTime(),
        },
        end: {
          dateTime: this.getSelectedDateTime(),
        },
      };
  
      // Llama al método createCalendarEvent() con los detalles del evento
      this.createCalendarEvent(eventDetails);
    }
  
    createCalendarEvent(event: any) {
      // Implementa la lógica para crear el evento en Google Calendar
      // utilizando el método createCalendarEvent() que hemos mencionado anteriormente
    }
  
    getSelectedDateTime(): string {
      // Combina la fecha y la hora seleccionadas en un solo objeto Date
      const selectedDateTime = new Date(this.selectedDate + ' ' + this.selectedTime);
  
      // Retorna la fecha y hora en formato ISO 8601
      return selectedDateTime.toISOString();
    }
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
    // Implementa la lógica para crear el evento en Google Calendar
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