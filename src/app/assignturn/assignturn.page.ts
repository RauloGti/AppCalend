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
    
    /*@function turno 
    @descipcion
    *muestra en consola la informacion almacenada en la variable turno
    */
    turno() {
      console.log('Fecha seleccionada:', this.Turno); 
    }  
  }