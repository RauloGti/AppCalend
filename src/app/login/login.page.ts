import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { async } from 'rxjs';

const provider = new GoogleAuthProvider();
const auth = getAuth();

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
  toastCtrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController

  ) { }

   /* @function mostrarAlerta
     @param {mensaje}
     @descripcion 
     *la funcion muestra en pantalla un mensaje que recibe por parametro.
  */
async mostrarAlerta(mensaje: string) {
  const alert = await this.alertController.create({
    header: 'Advertencia',
    message: mensaje,
    buttons: ['Aceptar']
  });

  await alert.present();
}
  ngOnInit() {
  }
  /*@function login
   @descripcion
   *si el form tiene datos extrae email y password y verifica si tiene contenido
   *autentifica que esos datos sean validos en firebase
   *si son validos te redirecciona al home
   *muestra un error si hubo un problema
  */
  //funcion login para conectar "logica" y validar los datos, importado desde firebase. con el AuthService.y el router para que diga donde redireccionar una vez ingresado al login.s
  async login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      if (email && password) { 
        this.authService.login(email, password)
          .then(() => {
            this.router.navigate(['/home']);
          })
          
          .catch((error: any) => {
            let mensaje = 'Error al iniciar sesión. Por favor, verifique los datos proporcionados e intente nuevamente.';
            this.mostrarAlerta(mensaje)
          });
      }
    } 
    else {
      this.form.markAllAsTouched();
    }
  }
  
    /*
      @function loginWithGoogle
      @descripcion
      *llama al la fuincion de autentificacion con google de firebase y pasa el proveedor de autentificacion de google como parametro
      *cuando inicia bien con la cuenta de google guarda las credenciales 
      *si al credencias no es nula guadar los token de acceso en una variable 
      *redirecciona al home
      *guarda errores    
    */

  loginWithGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential != null){
      const accessToken = credential.accessToken;
      console.log(accessToken);
    }
    const user = result.user;
    
    this.router.navigate(['/home']);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }

  
  
}