import Swal from 'sweetalert2';
import { MedicoService } from './../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from './../../../models/medico';
import { TablaColeccion, MedicoObj } from './../../../utils/enumeradores';
import { HospitalService } from './../../../services/hospital.service';
import { Hospital } from './../../../models/hospital.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  formMedico: FormGroup;
  hospitales: Hospital[];
  hospitalesSeleccionados: Hospital[] = [];
  hospitalesCheck: string[] = [];
  medico: Medico;
  idMedico = '';
  tablaColeccionHospital: TablaColeccion = TablaColeccion.Hospitales;
  tablaColeccionMedicos: TablaColeccion = TablaColeccion.Medicos;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private route: ActivatedRoute,
    private medicoService: MedicoService,
    private router: Router
  ) {
    this.route.params.subscribe(({ id }) => this.cargarMedico(id));
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService
      .getMedicoById(id)
      .pipe(delay(200))
      .subscribe((rpta) => {
        if (rpta.isSuccess) {
          this.medico = rpta.data;
          const idsHospitales = this.medico.hospital.map((hosp) => hosp._id);
          this.formMedico.setValue({
            nombre: this.medico.nombre,
            hospital: idsHospitales,
          });
        }
      });
  }

  validacionControl(controlName: string) {
    return (
      this.formMedico.get(controlName).touched &&
      this.formMedico.get(controlName).invalid
    );
  }

  crearFormulario() {
    this.hospitalService.cargarHospitales().subscribe((rpta) => {
      if (rpta.isSuccess) {
        this.hospitales = rpta.data;
      }
    });
    this.formMedico = this.fb.group({
      nombre: ['', Validators.required],
      hospital: [[], Validators.required],
    });
    this.formMedico.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalesCheck = hospitalId;
      this.hospitalesSeleccionados = this.hospitales.filter((hosp) =>
        this.filtrarPorId(hosp)
      );
    });
  }

  filtrarPorId(hospital: Hospital) {
    return this.hospitalesCheck.includes(hospital._id) ? true : false;
  }

  aceptarForm() {
    if (this.formMedico.valid) {
      if (this.medico) {
        this.medicoService
          .actualizarMedico(this.medico._id, this.formMedico.value)
          .subscribe((rpta) => {
            if (rpta.isSuccess) {
              Swal.fire('Exito', rpta.message, 'success');
            }
          });
      } else {
        const { nombre } = this.formMedico.value;
        this.medicoService
          .crearMedico(this.formMedico.value)
          .subscribe((rpta) => {
            if (rpta.isSuccess) {
              this.router.navigate(['/dashboard/medico', rpta.data._id]);
              Swal.fire('Exito', `${rpta.message}: ${nombre}`, 'success');
            }
          });
      }
    } else {
      this.formMedico.markAllAsTouched();
    }
  }
}
