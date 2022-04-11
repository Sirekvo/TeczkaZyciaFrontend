import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgxMasonryModule } from 'ngx-masonry';

import { UserService } from './shared/services/user.service';
import { AccountService } from './shared/services/account.service';


import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { MasterPageComponent } from './core/components/master-page/master-page.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { StarterComponent } from './core/components/starter/starter.component';
import { AccountProfileComponent } from './core/components/account-profile/account-profile.component';
import { IndexComponent } from './core/components/index/index.component';
import { FeatherModule } from 'angular-feather';

import { allIcons } from 'angular-feather/icons';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {AuthInterceptorProvider} from "./shared/interceptor/auth.interceptor";
import {FindPatientComponent} from "./core/components/find-patient/find-patient.component";
import {PatientService} from "./shared/services/patient.service";
import {PageConfirmMailComponent} from "./auth/page-confirm-mail/page-confirm-mail.component";
import {AuthRePasswordComponent} from "./auth/auth-re-password/auth-re-password.component";
import { VaccinationsInfoComponent } from './core/components/additional-info/vaccinations-info/vaccinations-info.component';
import { BloodInfoComponent } from './core/components/additional-info/blood-info/blood-info.component'; 


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthSignupComponent,
    AuthLoginComponent,
    MasterPageComponent,
    IndexComponent,
    StarterComponent,
    AccountProfileComponent,
    VaccinationsInfoComponent,
    BloodInfoComponent,
    FindPatientComponent,
    PageConfirmMailComponent,
    AuthRePasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    ScrollToModule.forRoot(),
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    NgxYoutubePlayerModule,
    NgbDropdownModule,
    CKEditorModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    SwiperModule,
    NgxTypedJsModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgxMasonryModule,
    LightboxModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  exports: [
    FeatherModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ AuthInterceptorProvider, UserService, AccountService, PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
