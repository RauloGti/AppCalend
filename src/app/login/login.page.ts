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
//funcion para mostrar un error personalizado al usuario
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
  //funcion login para conectar "logica" y validar los datos, importado desde firebase. con el AuthService.y el router para que diga donde redireccionar una vez ingresado al login.s
  async login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      if (email && password) { // Verificar si email y password no son null
        this.authService.login(email, password)
          .then(() => {
            this.router.navigate(['/home']);
          })
          //catch de errores personalizados de firebase
          .catch((error: any) => {
            let mensaje = 'Error al iniciar sesión. Por favor, verifique los datos proporcionados e intente nuevamente.';
            // if (error.code === 'auth/user-not-found') {
            //   mensaje = 'Usuario no encontrado. Por favor, verifica tus credenciales.';
            // } else if (error.code === 'auth/wrong-password') {
            //   mensaje = 'Usuario o Contraseña incorrecta. Por favor, verifica tus credenciales.';
            // } else if (error.code === 'auth/invalid-email') {
            //   mensaje = 'Correo electrónico inválido. Por favor, verifica tus credenciales.';
            // }
            // else if (error.code === 'auth/null-password') {
            //   mensaje = 'Escribe un contraseña';
            // }
            this.mostrarAlerta(mensaje)
          });
      }
    } 
    else {
      this.form.markAllAsTouched();
    }
  }
  
    
//funcion para el inicio de sesion con google
  loginWithGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential != null){
      const accessToken = credential.accessToken;
      console.log(accessToken);
       // Aquí tienes el token de acceso que puedes utilizar para realizar solicitudes a la API de Google Calendar.

        // También se puede obtener información adicional del usuario utilizando getAdditionalUserInfo(result)
        // const additionalUserInfo = getAdditionalUserInfo(result);
    }
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    this.router.navigate(['/home']);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
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

