import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc,getFirestore ,deleteDoc} from '@angular/fire/firestore'
@Component({
  selector: 'app-createpatient',
  templateUrl: './createpatient.page.html',
  styleUrls: ['./createpatient.page.scss'],
})
export class CreatepatientPage implements OnInit {

  constructor(private firestore :Firestore,) { }

  ngOnInit() {
  }

  collection: any[] |  undefined;

  inputNombre:string='';
  inputApellido:string='';
  inputDNI:string='';
  inputEdad:string='';
  inputCorreo:string='';
  inputTelefono:string='';

 creardatos() {
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

// }
}
