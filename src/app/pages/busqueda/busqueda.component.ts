import { Medico } from './../../models/medico';
import { TablaColeccion } from './../../utils/enumeradores';
import { DataBusquedaTodo } from './../../interfaces/busqueda-response.interface';
import { BusquedasService } from './../../services/busquedas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  dataBusquedaTodo: DataBusquedaTodo;
  tablaColeccionUsuarios = TablaColeccion.Usuarios;
  tablaColeccionMedicos = TablaColeccion.Medicos;
  tablaColeccionHospital = TablaColeccion.Hospitales;

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => this.buscar(termino));
  }

  buscar(termino: string) {
    if (termino?.trim()) {
      this.busquedasService.buscarTodo(termino.trim()).subscribe((rpta) => {
        if (rpta.isSuccess) {
          this.dataBusquedaTodo = rpta.data;
        }
      });
    }
  }

  buscarMedico(medico: Medico) {
    this.router.navigate(['/dashboard/medico', medico._id]);
  }
}
