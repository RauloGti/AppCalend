import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';

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
    
    
  ) {
    this.form = this.formBuilder.group({
      email:['', [Validators.required,Validators.required, Validators.pattern('[^@]+@[^@]+\.[a-zA-Z]{2,6}')]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required]],
    }, { validator: this.passwordMatchValidator.bind(this) });
   }
   
  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
      if (this.form.valid) {
        const { email, password } = this.form.getRawValue();
        //validar que pass y repass sean iguales
        if (email && password) { // Verificar si email y password no son null
          this.auth.register(email, password)
            .then(() => {
              this.router.navigate(['/login']);
            })
            .catch(error => {
              console.error(error);
              if (error.code === 'auth/weak-password') {
                this.mostrarError('La contraseña es débil. Debe tener al menos 6 caracteres.');
              } else if (error.code === 'auth/email-already-in-use') {
                this.mostrarError('El correo electrónico ya está en uso.');
              } else {
                this.mostrarError('Ocurrió un error al registrar el usuario.');
              }
            });
        }
      }
    }
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

