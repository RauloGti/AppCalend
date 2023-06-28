/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, getFirestore, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.page.html',
  styleUrls: ['./annotator.page.scss'],
})
export class AnnotatorPage implements OnInit {
  pacienteSeleccionado: any;
  observaciones: any;
  anotadorInput: string;
  escriturasAnteriores: string[];
  observacionesPaciente: any;

  constructor(private router: Router, private route: ActivatedRoute, private firestore: Firestore) {
    this.anotadorInput = '';
    this.escriturasAnteriores = [];
    
  }

  async ngOnInit() {
    const pacienteId = this.route.snapshot.paramMap.get('pacienteId');
    if (pacienteId) {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'Idpaciente', pacienteId);
        const docSnapshot = await getDoc(docRef);
        console.log(this.pacienteSeleccionado)
        if (docSnapshot.exists()) {
          const datos = docSnapshot.data();
          this.pacienteSeleccionado = {
            id: docSnapshot.id,
            nombre: datos['nombre'],
            apellido: datos['apellido'],
            correo: datos['correo'],
            dni: datos['dni'],
            numero: datos['telefono'],
            edad: datos['edad'],
            anotador: datos['anotador']
          };
          this.escriturasAnteriores = datos['escrituras'] || [];
          
        } else {
          console.log('No se encontró el paciente con el ID:', pacienteId);
          // Maneja el caso cuando no se encuentra el paciente en la base de datos
        }
      } catch (error) {
        console.log('Error al obtener los datos del paciente:', error);
        // Maneja el error al obtener los datos del paciente
      }
    } else {
      console.log('No se proporcionó el pacienteId');
      // Maneja el caso cuando no se proporciona el pacienteId
    }
  }

  async guardarEscritura() {
    const escritura = this.anotadorInput.trim();
    if (escritura) {
      try {
        const db = getFirestore();
        const escriturasRef = doc(db, 'Idpaciente', this.pacienteSeleccionado.id);
        await updateDoc(escriturasRef, {
          anotador: escritura,
          escrituras: [...this.escriturasAnteriores, escritura]
        });
  
        // Limpiar el input después de guardar
        this.anotadorInput = '';
        this.escriturasAnteriores.push(escritura);
        this.guardarObservaciones();
      } catch (error) {
        console.log('Error al guardar la escritura:', error);
        // Maneja el error al guardar la escritura
      }
    }
  }
  
  guardarObservaciones() {
    this.pacienteSeleccionado.anotador = this.observaciones;
    console.log(this.pacienteSeleccionado.anotador);
    // Aquí puedes implementar la lógica para guardar las observaciones
    console.log('Observaciones guardadas:', this.observaciones);
    // Puedes almacenar las observaciones en una base de datos, enviarlas a un servidor, etc.
    // También puedes actualizar el campo 'anotador' del pacienteSeleccionado con this.observaciones si deseas reflejarlo en la interfaz.
    this.pacienteSeleccionado.anotador = this.observaciones;
    
    console.log(this.pacienteSeleccionado.anotador);
  }

  cancelarAnotador() {
    // Aquí puedes implementar la lógica para cancelar y regresar a la pantalla anterior
    this.router.navigate(['/patients']);
  }

}*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collection, addDoc, collectionData, doc, getDoc, getFirestore, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.page.html',
  styleUrls: ['./annotator.page.scss'],
})
export class AnnotatorPage implements OnInit {
  pacienteSeleccionado: any;
  observaciones: any;
  anotadorInput: string;
  escriturasAnteriores: { texto: string, seleccionado: boolean }[];
  observacionesPaciente: any;

  constructor(private router: Router, private route: ActivatedRoute, private firestore: Firestore) {
    this.anotadorInput = '';
    this.escriturasAnteriores = [];
  }

  async ngOnInit() {
    const pacienteId = this.route.snapshot.paramMap.get('pacienteId');
    if (pacienteId) {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'Idpaciente', pacienteId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const datos = docSnapshot.data();
          this.pacienteSeleccionado = {
            id: docSnapshot.id,
            nombre: datos['nombre'],
            apellido: datos['apellido'],
            correo: datos['correo'],
            dni: datos['dni'],
            numero: datos['telefono'],
            edad: datos['edad'],
            anotador: datos['anotador']
          };
          this.escriturasAnteriores = datos['escrituras'] || [];

          // Asignar el valor 'false' a la propiedad 'seleccionado' de cada elemento
          this.escriturasAnteriores.forEach(escritura => escritura.seleccionado = false);
        } else {
          console.log('No se encontró el paciente con el ID:', pacienteId);
          // Maneja el caso cuando no se encuentra el paciente en la base de datos
        }
      } catch (error) {
        console.log('Error al obtener los datos del paciente:', error);
        // Maneja el error al obtener los datos del paciente
      }
    } else {
      console.log('No se proporcionó el pacienteId');
      // Maneja el caso cuando no se proporciona el pacienteId
    }
  }

  async guardarEscritura() {
    const escritura = this.anotadorInput.trim();
    if (escritura) {
      try {
        const db = getFirestore();
        const escriturasRef = doc(db, 'Idpaciente', this.pacienteSeleccionado.id);
        await updateDoc(escriturasRef, {
          anotador: escritura,
          escrituras: [...this.escriturasAnteriores, escritura]
        });

        // Limpiar el input después de guardar
        this.anotadorInput = '';
        this.escriturasAnteriores.push({ texto: escritura, seleccionado: false });
        this.guardarObservaciones();
      } catch (error) {
        console.log('Error al guardar la escritura:', error);
        // Maneja el error al guardar la escritura
      }
    }
  }

  async guardarObservaciones() {
    this.pacienteSeleccionado.anotador = this.observaciones;
    console.log(this.pacienteSeleccionado.anotador);
    // Aquí puedes implementar la lógica para guardar las observaciones
    console.log('Observaciones guardadas:', this.observaciones);
    // P
    this.pacienteSeleccionado.anotador = this.observaciones;

    // Actualizar el campo 'anotador' del pacienteSeleccionado en la base de datos
    try {
      const db = getFirestore();
      const pacienteRef = doc(db, 'Idpaciente', this.pacienteSeleccionado.id);
      await updateDoc(pacienteRef, {
        anotador: this.observaciones
      });
    } catch (error) {
      console.log('Error al actualizar el campo "anotador" del paciente:', error);
    }
  }

  borrarEscritura(escritura: { texto: string, seleccionado: boolean }) {
    // Eliminar la escritura de la lista de escrituras anteriores
    this.escriturasAnteriores = this.escriturasAnteriores.filter(e => e !== escritura);

    // Si la escritura estaba seleccionada, también la deseleccionamos
    if (escritura.seleccionado) {
      escritura.seleccionado = false;
    }

    // Aquí puedes implementar la lógica para eliminar la escritura de la base de datos
    // Utiliza el ID del paciente y el texto de la escritura para identificarla y eliminarla
  }

  cancelarAnotador() {
    // Aquí puedes implementar la lógica para cancelar y regresar a la pantalla anterior
    this.router.navigate(['/patients']);
  }
}
