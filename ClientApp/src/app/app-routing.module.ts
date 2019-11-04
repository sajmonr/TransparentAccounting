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
import {JournalComponent} from "./home/journal/journal.component";
import {RoleGuard} from "./role-guard.service";
import {UserRole} from "./shared/user-model";
import {LedgerComponent} from "./home/ledger/ledger.component";
import {ReportsComponent} from "./home/reports/reports.component";
import {IncomeStatementComponent} from "./home/reports/income-statement/income-statement.component";
import {TrialBalanceComponent} from "./home/reports/trial-balance/trial-balance.component";
import {BalanceSheetComponent} from "./home/reports/balance-sheet/balance-sheet.component";
import {RetainedEarningsStatementComponent} from "./home/reports/retained-earnings-statement/retained-earnings-statement.component";

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'app', component: HomeComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users', component: UsersComponent, canActivate: [AdminAuthGuard]},
      {path: 'accounts', component: AccountsComponent},
      {path: 'events', component: EventsComponent, canActivate: [RoleGuard], data: {
        allowedRoles: [UserRole.Administrator, UserRole.Manager]
        }},
      {path: 'email', component: EmailComponent, canActivate: [AdminAuthGuard]},
      {path: 'journal', component: JournalComponent, canActivate: [RoleGuard], data: {
        allowedRoles: [UserRole.Manager, UserRole.Accountant, UserRole.Administrator]
        }},
      {path: 'journal/:entryId', component: JournalComponent, canActivate: [RoleGuard], data: {
          allowedRoles: [UserRole.Manager, UserRole.Accountant, UserRole.Administrator]
        }},
      {path: 'ledger', component: LedgerComponent, canActivate: [RoleGuard], data: {
        allowedRoles: [UserRole.Administrator, UserRole.Manager, UserRole.Accountant]
        }},
      {path: 'ledger/:accountId', component: LedgerComponent, canActivate: [RoleGuard], data: {
          allowedRoles: [UserRole.Administrator, UserRole.Manager, UserRole.Accountant]
        }},
      {path: 'report', component: ReportsComponent, canActivate: [RoleGuard], data: {
          allowedRoles: [UserRole.Administrator, UserRole.Manager, UserRole.Accountant]
        }, children: [
          {path: 'income-statement', component: IncomeStatementComponent},
          {path: 'trial-balance', component: TrialBalanceComponent},
          {path: 'balance-sheet', component: BalanceSheetComponent},
          {path: 'retained-earnings-statement', component: RetainedEarningsStatementComponent}
        ]}
    ]},
  {path: 'account', component: AccountComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgot', component: ForgotComponent},
      {path: 'resolve/:userId/:result', component: ResolveComponent}
    ]},
  {path: '**', redirectTo: '/app'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
