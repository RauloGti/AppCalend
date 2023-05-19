import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }
  //funcion login para conectar "logica" y validar los datos
  login(){
    if(this.form.valid){
      const{email, password} = this.form.getRawValue();
      console.log(email,password);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
