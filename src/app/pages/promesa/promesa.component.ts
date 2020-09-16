import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styleUrls: ['./promesa.component.css'],
})
export class PromesaComponent implements OnInit {
  constructor() {}
  usuarios: any[] = [];

  ngOnInit(): void {
    const promesa = new Promise((resolve) => {
      resolve('Hola Miguel');
    });

    promesa
      .then((mensaje) => {
        console.log(mensaje);
      })
      .catch((error) => console.log('Error en la promesa', error));

    this.getUsuarios().then((rpta: any[]) => (this.usuarios = rpta));
  }

  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });

    return promesa;
  }
}
