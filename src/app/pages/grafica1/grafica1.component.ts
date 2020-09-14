import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css'],
})
export class Grafica1Component implements OnInit {
  leyendas = ['Zapatillas', 'Chaquetas', 'Jeans'];
  datos = [[150, 250, 350]];
  colores = [{ backgroundColor: ['#145374', '#00334e', '#ee6f57'] }];

  ngOnInit(): void {}
}
