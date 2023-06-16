import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(

    private apiservice: ApiserviceService
  ) { }

  ngOnInit() {
  }

  getEvents() {
    // Llama a los métodos del servicio ApiserviceService para obtener los eventos del calendario
    this.apiservice.getEvents().subscribe(
      (data : any) => {
        // Aquí puedes manipular los datos obtenidos, como mostrarlos en la página
        console.log(data);
      },
      (error : any) => {
        // Manejo de errores
        console.log(error);
      }
    );
  }
  
}
