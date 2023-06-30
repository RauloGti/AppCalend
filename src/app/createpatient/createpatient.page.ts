import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc,getFirestore ,deleteDoc} from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-createpatient',
  templateUrl: './createpatient.page.html',
  styleUrls: ['./createpatient.page.scss'],
})
export class CreatepatientPage implements OnInit {

  constructor(private firestore :Firestore,private alertController: AlertController) { }

  ngOnInit() {
  }

  collection: any[] |  undefined;

  inputNombre:string='';
  inputApellido:string='';
  inputDNI:string='';
  inputEdad:string='';
  inputCorreo:string='';
  inputTelefono:string='';


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

  /*@function limpiarCampos
    @descripcion
    * vacia todos los campos de la funcion.
  */
  limpiarCampos() {
    this.inputNombre = '';
    this.inputApellido = '';
    this.inputDNI = '';
    this.inputEdad = '';
    this.inputCorreo = '';
    this.inputTelefono = '';
  }

  /*@function creardatos
    @descripcion
    *evalua que todos lo campos esten llenos
    *evalua que dni sea un numero y si no muestra un error en pantalla
    *evalua que edad sea un numero y si no muestra un error en pantalla
    *evalua que el correo contenga @ y .com y si no muestra un error en pantalla
    *evalua que el telefono sea un numero y si no muestra un error en pantalla
    *declara un objeto con campos y asigna los inputs a eso campos
    *declara un objeto y lo iguala a una colleccion de firebase
    *añade a la collecion el objeto anterior con la sus campos
  */
 creardatos() {
  if (
    this.inputNombre.trim() === '' ||
    this.inputApellido.trim() === '' ||
    this.inputDNI.trim() === '' ||
    this.inputEdad.trim() === '' ||
    this.inputCorreo.trim() === '' ||
    this.inputTelefono.trim() === ''
    
  ) {
    this.mostrarAlerta('Por favor completa todos los campos');
    return;
  }

  if (isNaN(Number(this.inputDNI))) {
    this.mostrarAlerta('El campo DNI debe ser un número');
    return;
  }

  if (isNaN(Number(this.inputEdad))) {
    this.mostrarAlerta('El campo Edad debe ser un número');
    return;
  }

  if (!this.inputCorreo.includes('@') || !this.inputCorreo.includes('.com')) {
    this.mostrarAlerta('El campo Correo electrónico debe ser válido');
    return;
  }

  if (isNaN(Number(this.inputTelefono))) {
    this.mostrarAlerta('El campo Teléfono debe ser un número');
    return;
  }

    const objetoAgregar: any = {
      nombre: this.inputNombre,
      apellido: this.inputApellido,
      dni: this.inputDNI,
      edad: this.inputEdad,
      correo: this.inputCorreo,
      telefono: this.inputTelefono,
      anotador:""
    };

    const collectionCrear = collection(this.firestore, "Idpaciente");
    addDoc(collectionCrear, objetoAgregar)
      .then(() => {
        console.log("Se ha agregado el documento correctamente");
        
      })
      .catch((err) => {
        console.error("Error al agregar el documento:", err);
      });
  }

}
 

