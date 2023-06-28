import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, getFirestore, deleteDoc } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { idToken } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PatientInfoPage } from '../patients/patient-info.page';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  constructor(private firestore: Firestore, private alertController: AlertController, private router: Router, private modalController: ModalController) {}

  ngOnInit() {}
  pacienteSeleccionadoId: string="";
  pacientes: { nombre: string, apellido: string, correo: string, dni: string, numero: string, edad: string }[] = [];
  datos: any;
  searchTerm: string = '';
  pacienteSeleccionado: any=null;

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['Aceptar']
    })
    await alert.present();
  }
  
   accederAnotador() {
     if (this.pacienteSeleccionado) {
       this.router.navigate(['/annotator', { pacienteId: this.pacienteSeleccionado.id }]);
     } else {
       this.mostrarAlerta('Por favor, selecciona un paciente para acceder al anotador');
     }
   }
  
  seleccionarPaciente(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.pacienteSeleccionadoId = paciente.id;
    
  }

  //funcion que a traves de ionic cuando esta cargada la pantalla ejecuta el codigo
  async ionViewDidEnter(){
    try {
      console.log("trajo la informacion")
      const db = getFirestore();
      const collectionRef = collection(db, 'Idpaciente');
      const querySnapshot = await getDocs(collectionRef);
      this.pacientes = [];
      querySnapshot.forEach((doc) => {
        const datos = doc.data();
        const id = doc.id; 
        const paciente = {
          id:id,      
          nombre: datos['nombre'],
          apellido: datos['apellido'],
          correo: datos['correo'],
          dni: datos['dni'],
          numero: datos['telefono'],
          edad: datos['edad'],
        };
        this.pacientes.push(paciente);
      });

      console.log(this.pacientes);
    } catch (error) {
      console.log(error);
    }

    
  }
      
 
  eliminarPaciente() {
    console.log(this.pacienteSeleccionado)
    if (this.pacienteSeleccionado) {
      
      const index = this.pacientes.findIndex(paciente => paciente === this.pacienteSeleccionado);
      if (index !== -1) {
        this.pacientes.splice(index, 1);
        
        this.eliminarPacienteFirestore(this.pacienteSeleccionado); // Llama a la función para eliminar el documento en Firestore
        this.pacienteSeleccionado = null; // Resetea el paciente seleccionado
      }
    }
  }
  
  async eliminarPacienteFirestore(paciente: any) {
    try {
      const db = getFirestore();
      console.log(paciente.dni)
      const docRef = doc(db, 'Idpaciente', paciente.id); // Supongamos que tienes un campo 'dni' en el objeto paciente
  
      await deleteDoc(docRef);
      console.log('Paciente eliminado de Firestore');
    } catch (error) {
      console.log('Error al eliminar paciente de Firestore', error);
    }
  }
  async mostrarInformacionPaciente() {
    const modal = await this.modalController.create({
      component: PatientInfoPage,
      componentProps: {
        paciente: this.pacienteSeleccionado
      }
    });
    return await modal.present();
  }
  


}
  
  
  
  

