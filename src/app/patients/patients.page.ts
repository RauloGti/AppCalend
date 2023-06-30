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
    })
    await alert.present();
  }
  
  /*@function accederAnotador
  @descripcion
  *si tiene un paciente seleccionado redirige al anotador y pasa el parametro id del paciente seleccionado
  *si no selecciono ninguno muestra un error en pantalla
  */
   accederAnotador() {
     if (this.pacienteSeleccionado) {
       this.router.navigate(['/annotator', { pacienteId: this.pacienteSeleccionado.id }]);
     } else {
       this.mostrarAlerta('Por favor, selecciona un paciente para acceder al anotador');
     }
   }
  /*@function seleccionarPaciente
  @param {paciente}
  @descripcion
  *guarda en pacienteSelecionado el paciente recibido
  *guarda en pacienteSelecionadoId el id del paciente recibido
  */
  seleccionarPaciente(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.pacienteSeleccionadoId = paciente.id;
    
  }

  /*@function ionViewDidEnter
  @descripcion
  *abre la conexion con la base y a una collecion en especifico
  *capta el esta collecion especifica yla guarda en querySnapshot
  * se inicializa paciente como un array vacio
  * con un forEarh recorre cada documento que capto la querySnapshot
  * por cada documento se extrae la informacion y se la asigna a atriburos del objeto paciente
  * se agrega el objeto paciente a la array de pacientes
  * capta erroes y los muestra en consola
  */
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
      
 /*@function eliminarPaciente
  @descripcion
  *evalua si selecciono un paciente
  *busca por el index al paciente en la array
  *elimina al paciente del array
  *elimina al paciente de firebase 
  *resetea la selecion del paciente
 */
  eliminarPaciente() {
    console.log(this.pacienteSeleccionado)
    if (this.pacienteSeleccionado) {
      
      const index = this.pacientes.findIndex(paciente => paciente === this.pacienteSeleccionado);
      if (index !== -1) {
        this.pacientes.splice(index, 1);
        
        this.eliminarPacienteFirestore(this.pacienteSeleccionado); 
        this.pacienteSeleccionado = null; 
      }
    }
  }
  
  /*@function eliminarPacienteFirestore
  @param {paciente:any}
  @descripcion
  *abre la coneccion con firebase y con una collecion el especifico y toma el id del documento  y lo guarda en docRef
  *borra el documento en base al id del documento
  *por consola marca con un mensaje en consola si funciono o no 
  */
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
  /*@function mostrarInformacionPaciente
  @descripcion 
  *crea un modal llamado patientinfopage
  *pasa infomacion de pacienteciente selecionado al patientingopage con el componentProps
  @return {modal} retorna un modal que se muestra en la interfaz
  
  */
  async mostrarInformacionPaciente() {
    if(this.pacienteSeleccionado){
      const modal = await this.modalController.create({
        component: PatientInfoPage,
        componentProps: {
          paciente: this.pacienteSeleccionado
        }
      });
      return await modal.present();
    }
    
  }
  


}
  
  
  
  

