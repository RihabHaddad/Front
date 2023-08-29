import { Routes } from '@angular/router';
import { UserListComponent } from '../_metronic/partials/content/cards/user-list/user-list.component';
import { UpdateUserComponent } from '../modules/account/settings/forms/profile-details/update-user';
import { CardsComponent } from './cards/cards.component';
import { TablesWidget11Component } from '../_metronic/partials/content/widgets/tables/tables-widget11/tables-widget11.component';
import { AdvanceTablesWidget9Component } from '../_metronic/partials/content/widgets/advance-tables/advance-tables-widget9/advance-tables-widget9.component';
import { TablesWidget13Component } from '../_metronic/partials/content/widgets/tables/tables-widget13/tables-widget13.component';
import { TablesWidget10Component } from '../_metronic/partials/content/widgets/tables/tables-widget10/tables-widget10.component';
import { AddCardComponent } from './add-card/add-card.component';
import { UpdateCardComponent } from './update-card/update-card.component';
import { DriverBehaviorComponent } from './driver-behavior/driver-behavior.component';
import { SignInMethodComponent } from '../modules/account/settings/forms/sign-in-method/sign-in-method.component';
import { ResetPasswordComponent } from '../modules/auth/components/reset-password/reset-password.component';
import { AccidentComponent } from './accident/accident.component';


const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'updateusers/:_id',
    component: UpdateUserComponent,
  },
  {
    path: 'Cards',
    component: CardsComponent,
  },
  {
    path: 'AddCards',
    component: AddCardComponent,
  },
  {
    path: 'updateCards/:_id',
    component: UpdateCardComponent,
  },
  {
  path: 'DriverBehavior',
  component: DriverBehaviorComponent ,},
  {
  path: 'A',
  component: AccidentComponent ,},
  
    
  
];

export { Routing };
