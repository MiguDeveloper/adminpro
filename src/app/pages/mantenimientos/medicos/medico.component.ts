import { HospitalService } from './../../../services/hospital.service';
import { Hospital } from './../../../models/hospital.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  formMedico: FormGroup;
  hospitales: Hospital[];

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
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
  }

  aceptarForm() {
    if (this.formMedico.valid) {
    } else {
      this.formMedico.markAllAsTouched();
    }
  }
}
