import { BusquedasService } from './../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { TablaColeccion } from 'src/app/utils/enumeradores';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import { Hospital } from './../../../models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  cargando = true;
  hospitales: Hospital[] = [];
  imgSubs: Subscription;
  tablaColeccion: TablaColeccion = TablaColeccion.Hospitales;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.notificarSubioImagen.subscribe(
      (rpta) => {
        this.hospitales.find((hospital) =>
          hospital._id === rpta.uid ? (hospital.img = rpta.archivo) : ''
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarUsuarios().subscribe((resp) => {
      if (resp.isSuccess) {
        this.cargando = false;
        this.hospitales = resp.data;
      }
    });
  }

  guardarUpdateHospital(hospital: Hospital) {
    if (hospital.nombre) {
      const hospitalUpdateReq = { nombre: hospital.nombre };
      this.hospitalService
        .actualizarHospital(hospitalUpdateReq, hospital._id)
        .subscribe((resp) => {
          if (resp.isSuccess) {
            const txtHospital = document.getElementById(hospital._id);
            txtHospital.classList.add('is-valid');
            setTimeout(() => {
              txtHospital.classList.remove('is-valid');
            }, 500);
          }
        });
    } else {
      Swal.fire('Error', 'Debe ingresar el nombre del hospital', 'error');
    }
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta a punto de eliminar al hospital ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService
          .eliminarHospital(hospital._id)
          .subscribe((resp) => {
            if (resp.isSuccess) {
              this.cargarHospitales();
              Swal.fire('Eliminado!', resp.message, 'success');
            }
          });
      }
    });
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      TablaColeccion.Hospitales,
      hospital._id,
      hospital.img
    );
  }

  async showModalCrearHospital() {
    const result = await Swal.fire({
      text: 'Ingrese el nombre del nuevo hospital',
      title: 'Crear Hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital',
      confirmButtonText: 'Aceptar',
    });

    if (result.isConfirmed && result.value) {
      const hospitalUpdateReq = { nombre: result.value + '' };
      this.hospitalService
        .crearHospital(hospitalUpdateReq)
        .subscribe((resp) => {
          if (resp.isSuccess) {
            this.cargarHospitales();
            Swal.fire('Correcto', resp.message, 'success');
          }
        });
      console.log(result.value);
    }
  }

  buscarHospital(termino: string) {
    this.busquedaService.buscar(TablaColeccion.Hospitales, termino).subscribe();
  }
}
