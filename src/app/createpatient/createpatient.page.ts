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


  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }


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
      telefono: this.inputTelefono
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

  //FUNCION QUE ELIMINA
//   EliminarDatos(){

//     const placeDocRef = doc(this.firestore, `2azxOTkLwjOGtbKiI86g/2zaZY6us7VUc22xjQ87v`);
//     deleteDoc(placeDocRef);

//     try {
//       console.log("Se borro la data")

//     } catch(error) {
//       console.log(error)
//     } 

 }

