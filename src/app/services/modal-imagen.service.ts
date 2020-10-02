import { UploadImg } from './../interfaces/upload-img.interface';
import { environment } from './../../environments/environment';
import { TablaColeccion } from './../utils/enumeradores';
import { Injectable, EventEmitter } from '@angular/core';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  // tslint:disable-next-line: variable-name
  private _ocultarModal = true;
  tipo: TablaColeccion;
  id: string;
  img: string;
  notificarSubioImagen = new EventEmitter<UploadImg>();

  constructor() {}

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo: TablaColeccion, id: string, img: string = 'no-image') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    console.log(tipo);
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
