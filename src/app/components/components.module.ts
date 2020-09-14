import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent],
  imports: [CommonModule, FormsModule, ChartsModule, ComponentsRoutingModule],
  exports: [IncrementadorComponent, DonaComponent],
})
export class ComponentsModule {}
