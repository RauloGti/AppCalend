import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //formulario reactivo con validaciones para usar la importacion del metodo FormBuilder
  form = this.formBuilder.group({
    email:['', [Validators.email,Validators.required]],
    password: ['',[Validators.required]],
    confirmPassword: ['',[Validators.required]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }
  //funcion login para conectar "logica" y validar los datos
  register() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      if (email && password) { // Verificar si email y password no son null
        this.auth.register(email, password)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch(error => {
            console.error(error);
          });
      }
    } else {
      this.form.markAllAsTouched();
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

