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
  observaciones: string[] = [];
  anotadorInput: string;
  escriturasAnteriores: string[];
  notaSeleccionada: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private firestore: Firestore) {
    this.anotadorInput = '';
    this.escriturasAnteriores = [];
  }

  /*@function ngOnInit(ionic)
      @descripcion
      *declara una variable y la inicializa con una ruta  para traer el pacienteID 
      *si picienteId no es null entra en try abre la conecion con la base referido a una collecion en concreto y un documento
      *si evalua si existe crea una variable y guarda los datos de la base ahi , llama al paciente seleccionado 
      y guarda  sus datos segun los campos de la base de datos y los guarda en variables
      * guarda en escriturasAnteriores las almacenadas en la base de datos
      *asinga una copia del contenido a observaciones con el metodo slice()
      * muestra un mesaje de error si no se encontro el paciente o si tuvo error al encontrar sus datos o si no selecciono a ningun paciente
      * llama al mostrarAnotaciones()     
    */
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
          this.observaciones = this.escriturasAnteriores.slice(); // Copiar las escrituras anteriores a las observaciones
        } else {
          console.log('No se encontró el paciente con el ID:', pacienteId);
          // Manejar el caso cuando no se encuentra el paciente en la base de datos
        }
      } catch (error) {
        console.log('Error al obtener los datos del paciente:', error);
        // Manejar el error al obtener los datos del paciente
      }
    } else {
      console.log('No se proporcionó el pacienteId');
      // Manejar el caso cuando no se proporciona el pacienteId
    }

    // Mostrar las anotaciones al cargar la página
    this.mostrarAnotaciones();
  }

  /*@function mostrarAnotaciones
    @descripcion
    *abre la concion con la base 
    *consulta por una collecion en especifico y un documento en especifico
    * copia la informacion y la guarda en escrituras snapshot
    * si existe guarda en una variable la informacion del snapshot
    * trae las escrituras de la base y las guarda en observaciones
    * muestra errores si no encontro anotaciones o si hubo un error
  */
  async mostrarAnotaciones() {
    try {
      const db = getFirestore();
      const escriturasRef = doc(db, 'Idpaciente', this.pacienteSeleccionado.id);
      const escriturasSnapshot = await getDoc(escriturasRef);

      if (escriturasSnapshot.exists()) {
        const datos = escriturasSnapshot.data();
        this.observaciones = datos['escrituras'] || [];
      } else {
        console.log('No se encontraron anotaciones para el paciente');
      }
    } catch (error) {
      console.log('Error al obtener las anotaciones:', error);
    }
  }

  /*@function guardaEscritura
  @descripcion
  *declara una variable y la iniciacliza con el input de anotador tambien llama a trim 
  *si escritura existe try, conecta con la base de datos
  * llama a una collecion y documentos especificos
  * actualiza el docucumento refecieniado por escrituras ref 
  * y se actualiza la informacion en base a al documento guardado en escrituras ref
  * limpia el input y agrega las escrituras a escrituras anteriores y a observaciones
  * muestra un mensaje si hubo un error al guardar
*/
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
        this.observaciones.push(escritura); // Agregar la nueva escritura a la lista de observaciones
      } catch (error) {
        console.log('Error al guardar la escritura:', error);
        // Manejar el error al guardar la escritura
      }
    }
  }

  /*@function eliminarObservacion
@param recibe una {observacion}
 @descripcion
 * declara una variable yla inicializa en el index de la array observaciones
 *si el index es mayor a -1 borra la observacion de la array
 *abre una conexion con la base y una collecion y docuemento en particular y actualiza el campo de la base con el un dato vacio
 *muestra un error si hubo un error ala eliminar la observacion
*/
  async eliminarObservacion(observacion: string) {
    const index = this.observaciones.indexOf(observacion);
    if (index > -1) {
      this.observaciones.splice(index, 1); // Eliminar la observación de la lista

      try {
        const db = getFirestore();
        const escriturasRef = doc(db, 'Idpaciente', this.pacienteSeleccionado.id);
        await updateDoc(escriturasRef, {
          escrituras: this.observaciones
        });
      } catch (error) {
        console.log('Error al eliminar la observación:', error);
        // Manejar el error al eliminar la observación
      }
    }
  }
  async abrirNota(nota: string) {
    this.notaSeleccionada = nota;
  }

  cerrarNota() {
    this.notaSeleccionada = null;
  }
  guardarObservaciones() {
    this.pacienteSeleccionado.anotador = this.observaciones;
    console.log(this.pacienteSeleccionado.anotador);
    // Aquí puedes implementar la lógica para guardar las observaciones
    console.log('Observaciones guardadas:', this.observaciones);
    // Puedes almacenar las observaciones en la base de datos u otro medio de almacenamiento
  }

  cancelarAnotador() {
    // Aquí puedes implementar la lógica para cancelar y regresar a la pantalla anterior
    this.router.navigate(['/patients']);
  }
}