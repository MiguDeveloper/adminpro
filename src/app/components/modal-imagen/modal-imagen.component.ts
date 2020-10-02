import { UploadImg } from './../../interfaces/upload-img.interface';
import Swal from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';
import { ModalImagenService } from './../../services/modal-imagen.service';
import { Component, OnInit } from '@angular/core';
import { TablaColeccion } from 'src/app/utils/enumeradores';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent implements OnInit {
  fotoSeleccionada: File;
  imgTemp: any;
  archivoSubido: UploadImg = { uid: '', archivo: '' };

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    if (!this.fotoSeleccionada) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fotoSeleccionada);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirFoto() {
    if (this.fotoSeleccionada) {
      const id = this.modalImagenService.id;
      const tipo = this.modalImagenService.tipo;
      this.fileUploadService
        .actualizarFoto(this.fotoSeleccionada, tipo, id)
        .then((data) => {
          this.archivoSubido.uid = id;
          this.archivoSubido.archivo = data.data.archivo;
          this.modalImagenService.notificarSubioImagen.emit(this.archivoSubido);
          Swal.fire('Correcto', data.message, 'success');
          this.cerrarModal();
        })
        .catch((error) => {
          Swal.fire('Error', error.error.message, 'error');
        });
    } else {
      Swal.fire('Error', 'Debe seleccionar una imagen', 'error');
    }
  }
}
