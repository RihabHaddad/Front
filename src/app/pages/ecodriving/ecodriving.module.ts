import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsExamplesComponent } from 'src/app/modules/widgets-examples/widgets-examples.component';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { WidgetsExamplesModule } from 'src/app/modules/widgets-examples/widgets-examples.module';
import { EcodrivingComponent } from './ecodriving.component';
import { ChartsWidget3Component } from 'src/app/_metronic/partials/content/widgets/charts/charts-widget3/charts-widget3.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MixedWidget2Component } from 'src/app/_metronic/partials/content/widgets/mixed/mixed-widget2/mixed-widget2.component';
import { StatsWidget2Component } from 'src/app/_metronic/partials/content/widgets/stats/stats-widget2/stats-widget2.component';



@NgModule({
  declarations: [EcodrivingComponent],
  imports: [
    CommonModule,
    WidgetsExamplesModule,
    WidgetsModule,
    NgbModule,
    
  ]
})
export class EcodrivingModule { }
