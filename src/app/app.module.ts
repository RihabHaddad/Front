
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { CardsComponent } from './pages/cards/cards.component';
import { WidgetsModule } from './_metronic/partials/content/widgets/widgets.module';
import { CardsModule } from './pages/cards/cards.module';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { FormsModule } from '@angular/forms';
import { UpdateCardComponent } from './pages/update-card/update-card.component';
import { AccidentComponent } from './pages/accident/accident.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { DriverBehaviorComponent } from './pages/driver-behavior/driver-behavior.component';
import { WidgetsExamplesModule } from './modules/widgets-examples/widgets-examples.module';
import { WidgetsExamplesRoutingModule } from './modules/widgets-examples/widgets-examples-routing.module';
import { MixedComponent } from './modules/widgets-examples/mixed/mixed.component';
import { ChartsComponent } from './modules/widgets-examples/charts/charts.component';
import { StatisticsComponent } from './modules/widgets-examples/statistics/statistics.component';
import { ListsComponent } from './modules/widgets-examples/lists/lists.component';
import { WidgetsExamplesComponent } from './modules/widgets-examples/widgets-examples.component';
import { DriverBehaviorModule } from './pages/driver-behavior/driver-behavior.module';
import { DistancetravelledComponent } from './pages/distancetravelled/distancetravelled.component';
import { EcodrivingComponent } from './pages/ecodriving/ecodriving.component';
// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent, AddCardComponent, UpdateCardComponent, 
    AccidentComponent, NotificationsComponent, EcodrivingComponent, 
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    FormsModule, // Add FormsModule here7
    
   

   
    
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
