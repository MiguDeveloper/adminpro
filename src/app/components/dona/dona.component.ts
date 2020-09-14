import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css'],
})
export class DonaComponent implements OnInit {
  @Input() leyendas: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  @Input() datos: MultiDataSet = [[350, 450, 100]];
  @Input() colores: Color[] = [
    { backgroundColor: ['#68b0ab', '#006a71', '#ff7e67'] },
  ];
  @Input() titulo = 'Sin titulo';

  public donaLabels: Label[] = [];
  public donaData: MultiDataSet = [];
  public donaTipoGrafico: ChartType = 'doughnut';

  colors: Color[] = [];

  constructor() {}

  ngOnInit(): void {
    this.donaLabels = this.leyendas;
    this.donaData = this.datos;
    this.colors = this.colores;
  }
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
