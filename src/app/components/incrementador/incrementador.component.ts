import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css'],
})
export class IncrementadorComponent implements OnInit {
  porcentaje = 0;
  @Output() valorPorcentaje = new EventEmitter<number>();
  @Input() btnClass = 'btn btn-primary';

  constructor() {}

  ngOnInit(): void {}

  incrementar() {
    if (this.porcentaje >= 100) {
      this.valorPorcentaje.emit(100);
      return 100;
    } else {
      this.valorPorcentaje.emit(++this.porcentaje);
      return this.porcentaje;
    }
  }

  decrementar() {
    if (this.porcentaje <= 0) {
      this.valorPorcentaje.emit(0);
      return 0;
    } else {
      this.valorPorcentaje.emit(--this.porcentaje);
      return this.porcentaje;
    }
  }

  inputValorChange(porc: any) {
    if (porc.target.value) {
      if (Number.parseInt(porc.target.value) > 100) {
        this.porcentaje = 0;
        this.valorPorcentaje.emit(0);
      } else {
        this.porcentaje = porc.target.value;
        this.valorPorcentaje.emit(porc.target.value);
      }
    } else {
      this.porcentaje = 0;
      this.valorPorcentaje.emit(0);
    }
  }
}
