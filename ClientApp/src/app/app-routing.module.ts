import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./account/login/login.component";
import {AuthGuard} from "./auth-guard.service";
import {UsersComponent} from "./home/users/users.component";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {AccountsComponent} from "./home/accounts/accounts.component";
import {AdminAuthGuard} from "./admin-auth-guard.service";
import {EventsComponent} from "./home/events/events.component";
import {AccountComponent} from "./account/account.component";
import {RegisterComponent} from "./account/register/register.component";
import {ForgotComponent} from "./account/forgot/forgot.component";
import {ResolveComponent} from "./account/resolve/resolve.component";
import {EmailComponent} from "./home/email/email.component";

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'app', component: HomeComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users', component: UsersComponent, canActivate: [AdminAuthGuard]},
      {path: 'accounts', component: AccountsComponent},
      {path: 'events', component: EventsComponent, canActivate: [AdminAuthGuard]},
      {path: 'email', component: EmailComponent, canActivate: [AdminAuthGuard]}
    ]},
  {path: 'account', component: AccountComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgot', component: ForgotComponent},
      {path: 'resolve/:userId/:result', component: ResolveComponent}
    ]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
