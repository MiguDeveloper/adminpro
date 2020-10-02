import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ModalImagenComponent],
  imports: [CommonModule, FormsModule, ChartsModule, ComponentsRoutingModule],
  exports: [IncrementadorComponent, DonaComponent, ModalImagenComponent],
})
export class ComponentsModule {}
