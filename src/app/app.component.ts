import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mensajes', url: '/folder/inbox', icon: 'mail' },
    { title: 'Mensaje nuevo', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favoritos', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archivados', url: '/folder/archived', icon: 'archive' },
    { title: 'Eliminados', url: '/folder/trash', icon: 'trash' },
    { title: 'Configuracion', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  
  async logout(){
     await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
