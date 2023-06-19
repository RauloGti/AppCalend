import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, getFirestore, deleteDoc } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';

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

 
  //funcion que a traves de ionic cuando esta cargada la pantalla ejecuta el codigo
  async ionViewDidEnter(){
    try {
      const db = getFirestore();
      const collectionRef = collection(db, 'Idpaciente');
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((doc) => {
        const datos = doc.data();
        const paciente = {
          nombre: datos['nombre'],
          apellido: datos['apellido'],
          correo: datos['correo'],
          dni: datos['dni'],
          numero: datos['numero'],
          edad: datos['edad'],
        };
        this.pacientes.push(paciente);
      });

      console.log(this.pacientes);
    } catch (error) {
      console.log(error);
    }

    
  }
      
    



  }
  

