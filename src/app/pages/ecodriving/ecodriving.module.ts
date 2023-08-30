import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsExamplesComponent } from 'src/app/modules/widgets-examples/widgets-examples.component';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { WidgetsExamplesModule } from 'src/app/modules/widgets-examples/widgets-examples.module';
import { EcodrivingComponent } from './ecodriving.component';
import { ChartsWidget3Component } from 'src/app/_metronic/partials/content/widgets/charts/charts-widget3/charts-widget3.component';



@NgModule({
  declarations: [EcodrivingComponent,ChartsWidget3Component],
  imports: [
    CommonModule,
    WidgetsExamplesModule,
    WidgetsModule
  ]
})
export class EcodrivingModule { }
