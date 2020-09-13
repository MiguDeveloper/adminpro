import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { IncrementadorComponent } from './incrementador/incrementador.component';

@NgModule({
  declarations: [IncrementadorComponent],
  imports: [CommonModule, FormsModule, ComponentsRoutingModule],
  exports: [IncrementadorComponent],
})
export class ComponentsModule {}
