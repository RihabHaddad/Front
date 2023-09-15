import { NgModule } from '@angular/core';
import { WidgetsModule } from 'src/app/_metronic/partials/content/widgets/widgets.module';
import { FormsModule } from '@angular/forms';
import { GestionAssuresComponent } from './gestion-assures.component';

@NgModule({
  declarations: [GestionAssuresComponent],
  imports: [WidgetsModule,
    FormsModule // Add FormsModule here
  ], // Import WidgetsModule here
  exports: [GestionAssuresComponent],
})
export class AssureModule {}
