import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsWidget5Component } from 'src/app/_metronic/partials/content/widgets/stats/stats-widget5/stats-widget5.component';
import { WidgetsExamplesComponent } from 'src/app/modules/widgets-examples/widgets-examples.component';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [ StatsWidget5Component,],
  imports: [
    CommonModule,
    WidgetsExamplesComponent,
    MatIconModule,
    MatCardModule, // Ajout du module MatCardModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class DistancetravelledModule { }
