import { MixedWidget7Component } from "src/app/_metronic/partials/content/widgets/mixed/mixed-widget7/mixed-widget7.component";
import { DriverBehaviorComponent } from "./driver-behavior.component";
import { StatisticsComponent } from "src/app/modules/widgets-examples/statistics/statistics.component";
import { ChartsComponent } from "src/app/modules/widgets-examples/charts/charts.component";
import { MixedComponent } from "src/app/modules/widgets-examples/mixed/mixed.component";
import { WidgetsExamplesModule } from "src/app/modules/widgets-examples/widgets-examples.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WidgetsModule } from "src/app/_metronic/partials";
import { DistancetravelledComponent } from "../distancetravelled/distancetravelled.component";
import { LineChartModule } from "../line-chart/line-chart.module";

@NgModule({
  declarations: [
    DriverBehaviorComponent,
    DistancetravelledComponent,
  ],
  imports: [
    CommonModule,
    WidgetsExamplesModule,
    WidgetsModule,
    LineChartModule
 
  ],
})
export class DriverBehaviorModule {}
