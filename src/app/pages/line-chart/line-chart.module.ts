import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../linechart/linechart.component';

@NgModule({
  declarations: [LineChartComponent],
  imports: [CommonModule],
  exports: [LineChartComponent], // Si vous avez besoin d'exporter le composant
})
export class LineChartModule {}
