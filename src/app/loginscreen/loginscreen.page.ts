import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ToastController } from '@ionic/angular';
import { async } from 'rxjs';

const provider = new GoogleAuthProvider();
const auth = getAuth();

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})

export class LoginscreenPage implements OnInit {

  auth: any;
  toastCtrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router,
    private loadingController: LoadingController,
    private toastController: ToastController
    )  {}

   /* @function mostrarAlerta
     @param {mensaje}
     @descripcion 
     *la funcion muestra en pantalla un mensaje que recibe por parametro.
  */
  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  ngOnInit() {
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
      const token = credential.accessToken;
      console.log(token);
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