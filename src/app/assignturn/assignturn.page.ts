import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignturn',
  templateUrl: './assignturn.page.html',
  styleUrls: ['./assignturn.page.scss'],
})
export class AssignturnPage implements OnInit {
  Turno: string | undefined; 

  constructor() {}

  ngOnInit() {}

  turno() {
    console.log('Fecha seleccionada:', this.Turno); 
  }
}
