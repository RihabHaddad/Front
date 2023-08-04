// module-name.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule ,
    FormsModule // Add FormsModule here
    // Import any other modules that you want to use in this module
  ],
  providers: [
  ],
  exports: [
  ]
})
export class AddCardModule { }
