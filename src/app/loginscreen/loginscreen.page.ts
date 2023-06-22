// import { Component, OnInit } from '@angular/core';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// import { FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { LoadingController } from '@ionic/angular';

// import { ToastController } from '@ionic/angular';
// import { async } from '@angular/core/testing';



// @Component({
//   selector: 'app-loginscreen',
//   templateUrl: './loginscreen.page.html',
//   styleUrls: ['./loginscreen.page.scss'],
// })

// export class LoginscreenPage implements OnInit {

//   constructor(
//     private formBuilder: FormBuilder,
//     private authService : AuthService,
//     private router : Router,
//     private loadingController: LoadingController,
//     private toastController: ToastController
//     ) 
//     {      }

//   ngOnInit() {
//   }

// }

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

  //funcion para mostrar un error personalizado al usuario
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

  //funcion para el inicio de sesion con google
  loginWithGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential != null){
      const token = credential.accessToken;
      console.log(token);
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
}
