import { BrowserModule } from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './home/nav-menu/nav-menu.component';
import {LoginComponent} from "./account/login/login.component";
import {AppRoutingModule} from "./app-routing.module";
import {LoginService} from "./services/login.service";
import {AuthGuard} from "./auth-guard.service";
import {CookieService} from "ngx-cookie-service";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {UsersComponent} from "./home/users/users.component";
import {HomeComponent} from "./home/home.component";
import {ApiService} from "./services/api.service";
import {AccountsComponent} from "./home/accounts/accounts.component";
import {AccountsCategoryComponent} from "./home/accounts/accounts-category/accounts-category.component";
import {AdminAuthGuard} from "./admin-auth-guard.service";
import {EventsComponent} from "./home/events/events.component";
import {LoggingService} from "./services/logging.service";
import {AccountComponent} from "./account/account.component";
import {RegisterComponent} from "./account/register/register.component";
import {MessageService} from "./services/message.service";
import {MessageComponent} from "./shared/components/message/message.component";
import {ResolveComponent} from "./account/resolve/resolve.component";
import {ForgotComponent} from "./account/forgot/forgot.component";
import {EmailComponent} from "./home/email/email.component";
import {JournalComponent} from "./home/journal/journal.component";
import {JournalEntriesListComponent} from "./home/journal/entries/journal.entries.list.component";
import {JournalAddFormComponent} from "./home/journal/add-form/journal-add-form.component";
import {AccountsService} from "./services/accounts.service";
import {JournalService} from "./services/journal.service";
import {RoleGuard} from "./role-guard.service";
import {DatePipe} from "@angular/common";
import {FileService} from "./services/file.service";
import {LedgerComponent} from "./home/ledger/ledger.component";
import {LedgerEntryComponent} from "./home/ledger/ledger-entry/ledger-entry.component";
import {ReportsComponent} from "./home/reports/reports.component";
import {IncomeStatementComponent} from "./home/reports/income-statement/income-statement.component";
import {TrialBalanceComponent} from "./home/reports/trial-balance/trial-balance.component";
import {BalanceSheetComponent} from "./home/reports/balance-sheet/balance-sheet.component";
import {RetainedEarningsStatementComponent} from "./home/reports/retained-earnings-statement/retained-earnings-statement.component";
import {ReportsService} from "./services/reports.service";
import {UsersService} from "./services/users.service";
import {EmailService} from "./services/email.service";
import {EventComponent} from "./home/events/eventcomponents/event.component";
import {AccountingCurrencyPipe} from "./shared/pipes/accounting-currency.pipe";
import {RatioComponent} from "./home/dashboard/ratio/ratio.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MessageComponent,
    LoginComponent,
    AccountComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    UsersComponent,
    AccountsComponent,
    AccountsCategoryComponent,
    ForgotComponent,
    EventsComponent,
    EventComponent,
    ResolveComponent,
    EmailComponent,
    JournalComponent,
    JournalEntriesListComponent,
    JournalAddFormComponent,
    LedgerComponent,
    LedgerEntryComponent,
    ReportsComponent,
    IncomeStatementComponent,
    TrialBalanceComponent,
    BalanceSheetComponent,
    RetainedEarningsStatementComponent,
    AccountingCurrencyPipe,
    RatioComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, LoginService, AuthGuard, RoleGuard, AdminAuthGuard, CookieService, ApiService, LoggingService, MessageService, AccountsService, JournalService,FileService, ReportsService, UsersService, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
