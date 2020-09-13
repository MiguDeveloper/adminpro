import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  porcentaje = 0;
  porcentaje2 = 0;
  constructor() {}
  ngOnInit(): void {}
  get getPorcentaje() {
    return `${this.porcentaje}%`;
  }

  get getPorcentaje2() {
    return `${this.porcentaje2}%`;
  }
}
