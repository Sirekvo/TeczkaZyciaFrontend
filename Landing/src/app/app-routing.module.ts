import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { StarterComponent } from './core/components/starter/starter.component';
import { AccountProfileComponent } from './core/components/account-profile/account-profile.component';
import { IndexComponent } from './core/components/index/index.component';
import { MasterPageComponent } from './core/components/master-page/master-page.component';
import { FindPatientComponent} from "./core/components/find-patient/find-patient.component";

import { AuthGuard } from './auth/auth.guard';


import { combineLatest } from 'rxjs/internal/operators';
import {PageConfirmMailComponent} from "./auth/page-confirm-mail/page-confirm-mail.component";
import {AuthRePasswordComponent} from "./auth/auth-re-password/auth-re-password.component";
import { VaccinationsInfoComponent } from './core/components/additional-info/vaccinations-info/vaccinations-info.component';
import { BloodInfoComponent } from './core/components/additional-info/blood-info/blood-info.component';
import { AccountSettingsComponent } from './core/components/account-settings/account-settings.component';

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
  { path: 'patient/:code', component: FindPatientComponent },
  { path: 'registration', component: AuthSignupComponent },
  { path: 'confirm-mail', component: PageConfirmMailComponent },
  { path: 'reset-password', component: AuthRePasswordComponent },
  { path: 'starter', component: StarterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
    },
  { path: 'main', component: AccountProfileComponent },
  { path: 'vaccinations', component: VaccinationsInfoComponent},
  { path: 'blood', component: BloodInfoComponent},
  { path: 'settings', component: AccountSettingsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled",
  scrollOffset: [0, 0],
  // Enable scrolling to anchors
  anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
