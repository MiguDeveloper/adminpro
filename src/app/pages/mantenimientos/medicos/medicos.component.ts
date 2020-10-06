import { BusquedasService } from './../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import { TablaColeccion } from './../../../utils/enumeradores';
import { MedicoService } from './../../../services/medico.service';
import { Medico } from './../../../models/medico';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  medicos: Medico[] = [];
  cargando = true;
  tablaColeccion: TablaColeccion = TablaColeccion.Medicos;
  imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.notificarSubioImagen.subscribe(
      (rpta) => {
        this.medicos.find((medico) =>
          medico._id === rpta.uid ? (medico.img = rpta.archivo) : ''
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((rpta) => {
      if (rpta.isSuccess) {
        this.cargando = false;
        this.medicos = rpta.data;
      }
    });
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id).subscribe((rpta) => {
          if (rpta.isSuccess) {
            this.cargarMedicos();
            Swal.fire('Eliminado!', 'El medico a sido eliminado', 'success');
          }
        });
      }
    });
  }

  buscar(termino: string) {
    if (termino?.trim()) {
      this.busquedaService
        .buscar(this.tablaColeccion, termino)
        .subscribe((rpta) => {
          if (rpta.isSuccess) {
            this.medicos = rpta.data;
          }
        });
    }
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal(
      TablaColeccion.Medicos,
      medico._id,
      medico.img
    );
  }
}
