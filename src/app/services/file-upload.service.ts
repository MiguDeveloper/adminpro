import { UsuarioService } from './usuario.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private usuarioService: UsuarioService) {}
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: { 'x-token': this.usuarioService.getToken },
        body: formData,
      });

      const data = await resp.json();
      if (data.isSuccess) {
        return data;
      } else {
        console.log(data);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
