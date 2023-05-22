import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
//formulario reactivo con validaciones para usar la importacion del metodo FormBuilder
  form = this.formBuilder.group({
    email:['',[Validators.email,Validators.required]],
    password: ['',[Validators.required]],
  })
  auth: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }
  //funcion login para conectar "logica" y validar los datos, importado desde firebase. con el AuthService.y el router para que diga donde redireccionar una vez ingresado al login.s
  login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      if (email && password) { // Verificar si email y password no son null
        this.authService.login(email, password)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
  //funcion que muestra un popup con un mensaje de espera al ingreso del sistema, vinculado al boton de login.
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Ingresando al Sistema, esto puede demorar unos segundos...',
      duration: 3000
    });
  
    await loading.present();
  
    // Simular una tarea asincrónica (por ejemplo, una llamada a la API)
    // Puedes reemplazar esto con tu lógica de inicio de sesión
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
}
  /*
  login(){
    if(this.form.valid){
      const{email, password} = this.form.getRawValue();
      this.auth.register(email, password)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch(error => {
            console.error(error);
          });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
*/