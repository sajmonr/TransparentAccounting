import {Component, Input, OnInit} from "@angular/core";
import {LoggingService} from "../../../services/logging.service";
import {Event, EventType} from "../../../shared/event.model";
import {Account, NormalSide} from "../../../shared/account.model";
import {JournalTransaction} from "../../../shared/journal.transaction.model";
import {JournalEntry} from "../../../shared/journal.entry.model";
import {ApiMethod, ApiService} from "../../../services/api.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'event-component',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() event: Event;

  private allAccounts: Account[] = [];

  private originalAccountEvent: Account;
  private updatedAccountEvent: Account;

  private journalTransaction: JournalTransaction;

  private normalSide = NormalSide;

  constructor(private loggingService: LoggingService, private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Account[]>(this.apiService.getUrl(ApiMethod.GetAccounts)).subscribe(accounts => {
      this.allAccounts = accounts;
      this.getEvent();
    });
  }

  private getEvent() {
    if (this.isAccount()) {
      this.originalAccountEvent = this.loggingService.retrieveLoggedObject<Account>(this.getJson(true));
      this.updatedAccountEvent = this.loggingService.retrieveLoggedObject<Account>(this.getJson(false));
    }
    if (this.isJournalEntry()) {
      this.journalTransaction = this.loggingService.retrieveLoggedObject<JournalTransaction>(this.event.original)
    }
  }

  private getAccount(id: number): Account {
    return this.allAccounts.find(account => account.id == id);
  }

  private getDebitBalance(entry, account) {
    return account.normalSide == 0 ? entry.amount : entry.amount * -1;
  }

  private getCreditBalance(entry, account) {
    return account.normalSide == 1 ? entry.amount : entry.amount * -1;
  }

  private isDebit(entry: JournalEntry): boolean {
    return entry.side == 0;
  }

  private isAccount(): boolean {
    return this.event.eventType == EventType.Account;
  }

  private isJournalEntry(): boolean {
    return this.event.eventType == EventType.JournalEntry;
  }

  private getJson(isOriginal) {
    return isOriginal ? this.event.original : this.event.updated;
  }
}
