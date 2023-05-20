import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
    private router : Router
  ) { }

  ngOnInit() {
  }
  //funcion login para conectar "logica" y validar los datos
  login() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      if (email && password) { // Verificar si email y password no son null
        this.auth.register(email, password)
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
  }*/
}
