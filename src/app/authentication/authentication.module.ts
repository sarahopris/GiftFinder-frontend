import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxCaptchaModule} from 'ngx-captcha';
import {DialogModule} from "primeng/dialog";
import { TranslateModule} from "@ngx-translate/core";
import {SelectButtonModule} from 'primeng/selectbutton';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    DialogModule,
    TranslateModule,
    SelectButtonModule
  ],
  exports: [
    LoginPageComponent,
    RegisterPageComponent
  ]
})
export class AuthenticationModule {
}



