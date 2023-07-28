import { NgModule } from '@angular/core';
import { CardsComponent } from './cards.component';
import { WidgetsModule } from 'src/app/_metronic/partials/content/widgets/widgets.module';

@NgModule({
  declarations: [CardsComponent],
  imports: [WidgetsModule], // Import WidgetsModule here
  exports: [CardsComponent],
})
export class CardsModule {}
