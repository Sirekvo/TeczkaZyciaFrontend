import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { StarterComponent } from './core/components/starter/starter.component';
import { AccountProfileComponent } from './core/components/account-profile/account-profile.component';
import { IndexComponent } from './core/components/index/index.component';
import { MasterPageComponent } from './core/components/master-page/master-page.component';

import { AuthGuard } from './auth/auth.guard';


import { combineLatest } from 'rxjs/internal/operators';

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'index', component: IndexComponent },

    ]
  },
  { path: 'login', component: AuthLoginComponent },
  { path: 'registration', component: AuthSignupComponent },
  { path: 'starter', component: StarterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
    },
  { path: 'main', component: AccountProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled",
  scrollOffset: [0, 0],
  // Enable scrolling to anchors
  anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
