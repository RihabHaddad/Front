import { NgModule } from '@angular/core';
import { CardsComponent } from './cards.component';
import { WidgetsModule } from 'src/app/_metronic/partials/content/widgets/widgets.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardsComponent],
  imports: [WidgetsModule,
    FormsModule // Add FormsModule here
  ], // Import WidgetsModule here
  exports: [CardsComponent],
})
export class CardsModule {}
