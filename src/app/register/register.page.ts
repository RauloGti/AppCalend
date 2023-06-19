import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //formulario reactivo con validaciones para usar la importacion del metodo FormBuilder
  form:FormGroup;
  passwordsMatch: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router : Router,
    private toastController: ToastController,
    private alertController: AlertController
    
    
  ) {
    this.form = this.formBuilder.group({
      email:['', [Validators.required,Validators.required, Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,6}')]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required]],
    }, { validator: this.passwordMatchValidator.bind(this) });
   }
   
   async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  ngOnInit() {
  }

    //funcion login para conectar "logica" y validar los datos

    register() {
        const { email, password, confirmPassword } = this.form.getRawValue();
    
        let frontValid = false;
        // Validar que contraseña y confirmar contraseña sean iguales
        if (password !== confirmPassword) {
          this.mostrarAlerta( 'La contraseña y la confirmación de contraseña no coinciden');
          return;
        }
    
        // Validar que la contraseña tenga al menos 6 caracteres
        if (password.length < 6) {
          this.mostrarAlerta( 'La contraseña debe tener al menos 6 caracteres');
          return;
        }
    
        // Validar el formato del correo electrónico
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
        this.mostrarAlerta( 'Ingrese un correo electrónico de @gmail.com válido');
        return;}
        
    
        
        // Realizar el registro si todas las validaciones son exitosas
        if (email && password) { // Verificar si email y password no son null
          this.auth.register(email, password)
            .then(() => {
              this.router.navigate(['/login']);
            })
            .catch(error => {
              console.error(error);
              if (error.code === 'auth/email-already-in-use') {
                this.mostrarAlerta('El correo electrónico ya está en uso.');
              }
            });
      }
    }


    // register() {

//     if (email && password) { // Verificar si email y password no son null
//       this.auth.register(email, password)
//         .then(() => {
//           this.router.navigate(['/login']);
//         })
//         .catch(error => {
//           console.error(error);
//           if (error.code === 'auth/weak-password') {
//             this.mostrarError('La contraseña es débil. Debe tener al menos 6 caracteres.');
//           } else if (error.code === 'auth/email-already-in-use') {
//             this.mostrarError('El correo electrónico ya está en uso.');
//           } else {
//             this.mostrarError('Ocurrió un error al registrar el usuario.');
//           }
//         });
//         }

// if (email && password) { // Verificar si email y password no son null
//   this.auth.register(email, password)
//     .then(() => {
//       this.router.navigate(['/login']);
//     })
//     .catch(error => {
//       console.error(error);
//       this.mostrarAlerta( 'Usuario registrado correctamente');
//     });
// }


    //   if (this.form.valid) {
    //     const { email, password } = this.form.getRawValue();
    //     //validar que pass y repass sean iguales
    //     if (email && password) { // Verificar si email y password no son null
    //       this.auth.register(email, password)
    //         .then(() => {
    //           this.router.navigate(['/login']);
    //         })
    //         .catch(error => {
    //           console.error(error);
             
    //         });
    //     }
    //   }
    // }
} 
  
  /*register(){
    if(this.form.valid){
      const { email, password } = this.form.getRawValue();
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

