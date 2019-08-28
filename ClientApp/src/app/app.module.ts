import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './home/nav-menu/nav-menu.component';
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from "./app-routing.module";
import {LoginService} from "./login.service";
import {AuthGuard} from "./auth-guard.service";
import {CookieService} from "ngx-cookie-service";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {UsersComponent} from "./home/users/users.component";
import {HomeComponent} from "./home/home.component";
import {ApiService} from "./api.service";
import {AccountsComponent} from "./home/accounts/accounts.component";
import {AccountsCategoryComponent} from "./home/accounts/accounts-category/accounts-category.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UsersComponent,
    AccountsComponent,
    AccountsCategoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [LoginService, AuthGuard, CookieService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
