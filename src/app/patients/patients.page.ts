import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, getFirestore, deleteDoc } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { idToken } from '@angular/fire/auth';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  pacientes: { nombre: string, apellido: string, correo: string, dni: string, numero: string, edad: string }[] = [];
  datos: any;
  searchTerm: string = '';
  pacienteSeleccionado: any=null;
 
  //funcion que a traves de ionic cuando esta cargada la pantalla ejecuta el codigo
  async ionViewDidEnter(){
    try {
      console.log("trajo la informacion")
      const db = getFirestore();
      const collectionRef = collection(db, 'Idpaciente');
      const querySnapshot = await getDocs(collectionRef);

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
      
  seleccionarPaciente(paciente: any) {
    this.pacienteSeleccionado = paciente;
    console.log(this.pacienteSeleccionado)

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

}
  
  
  
  

