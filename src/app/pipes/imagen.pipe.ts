import { environment } from './../../environments/environment';
import { TablaColeccion } from './../utils/enumeradores';
import { Pipe, PipeTransform } from '@angular/core';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: TablaColeccion): unknown {
    if (img?.includes('https')) {
      return img;
    }
    if (img) {
      return `${base_url}/upload/${tipo}/${img}`;
    } else {
      return `${base_url}/upload/${tipo}/no-img`;
    }
  }
}
