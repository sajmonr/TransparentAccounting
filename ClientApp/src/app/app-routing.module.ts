import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth-guard.service";
import {UsersComponent} from "./home/users/users.component";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {AccountsComponent} from "./home/accounts/accounts.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {AdminAuthGuard} from "./admin-auth-guard.service";

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'app', component: HomeComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users', component: UsersComponent, canActivate: [AdminAuthGuard]},
      {path: 'accounts', component: AccountsComponent}
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'passwordReset', component: PasswordResetComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
