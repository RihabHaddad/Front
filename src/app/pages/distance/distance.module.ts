import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsExamplesModule } from 'src/app/modules/widgets-examples/widgets-examples.module';
import { DistanceComponent } from './distance.component';
import { WidgetsModule } from 'src/app/_metronic/partials';



@NgModule({
  declarations: [DistanceComponent,
  ],
  imports: [
    CommonModule,
    WidgetsExamplesModule,
    WidgetsModule,
   
  ]
})
export class DistanceModule { }
