import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MixedWidget10Component } from "src/app/_metronic/partials/content/widgets/mixed/mixed-widget10/mixed-widget10.component";
import { WidgetsExamplesRoutingModule } from "./widgets-examples-routing.module";
import { WidgetsModule } from "src/app/_metronic/partials";
import { FeedsComponent } from "./feeds/feeds.component";
import { TablesComponent } from "./tables/tables.component";
import { MixedComponent } from "./mixed/mixed.component";
import { ChartsComponent } from "./charts/charts.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ListsComponent } from "./lists/lists.component";
import { WidgetsExamplesComponent } from "./widgets-examples.component";
import { MixedWidget6Component } from "src/app/_metronic/partials/content/widgets/mixed/mixed-widget6/mixed-widget6.component";
import { MixedWidget11Component } from "src/app/_metronic/partials/content/widgets/mixed/mixed-widget11/mixed-widget11.component";

@NgModule({
  declarations: [
    WidgetsExamplesComponent,
    ListsComponent,
    StatisticsComponent,
    ChartsComponent,
    MixedComponent,
    TablesComponent,
    FeedsComponent,
   
    // Remove MixedWidget10Component from here
  ],
  imports: [CommonModule, WidgetsExamplesRoutingModule, WidgetsModule],
  exports: [
    // Other exports...
    MixedWidget10Component,
    MixedWidget6Component,
    MixedWidget11Component,  
    // If you intend to use it outside the module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WidgetsExamplesModule {}
