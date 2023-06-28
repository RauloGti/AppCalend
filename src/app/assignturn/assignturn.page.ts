import { Component } from '@angular/core';
import { CalendarPage } from '../calendar/calendar.page';

@Component({
  selector: 'app-assignturn',
  templateUrl: './assignturn.page.html',
  styleUrls: ['./assignturn.page.scss'],
})
export class AssignturnPage {
  calendarPage: CalendarPage;

  selectedDate: string = '';
  selectedTime: string = '';
  Turno: string | undefined;
  tituloEvento: any;

  constructor() {
    this.calendarPage = new CalendarPage();
  }

  saveEvent() {
    const eventDetails = {
      summary: this.tituloEvento, // Utiliza el título del evento almacenado en this.tituloEvento
      description: 'Descripción del evento',
      location: 'Ubicación del evento',
      start: {
        dateTime: this.getSelectedDateTime(),
      },
      end: {
        dateTime: this.getSelectedDateTime(),
      },
    };

    // Llama al método createCalendarEvent() en la instancia de CalendarPage pasando los detalles del evento
    this.calendarPage.createCalendarEvent(eventDetails);
  }

  getSelectedDateTime(): string {
    const selectedDateParts = this.selectedDate.split('-');
    const selectedTimeParts = this.selectedTime.split(':');
  
    const year = Number(selectedDateParts[0]);
    const month = Number(selectedDateParts[1]) - 1;
    const day = Number(selectedDateParts[2]);
    const hour = Number(selectedTimeParts[0]);
    const minute = Number(selectedTimeParts[1]);
  
    // Verificar si los valores son numéricos y están dentro de un rango válido
    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute)) {
      console.error('Valores de fecha y hora no válidos');
      return ''; // O retorna un valor predeterminado o lanza una excepción, según tus necesidades
    }
  
    const selectedDateTime = new Date(year, month, day, hour, minute);
  
    // Verificar si el objeto Date es válido
    if (isNaN(selectedDateTime.getTime())) {
      console.error('Fecha y hora no válidas');
      return ''; // O retorna un valor predeterminado o lanza una excepción, según tus necesidades
    }
  
    return selectedDateTime.toISOString();
  }
  

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