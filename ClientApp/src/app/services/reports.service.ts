import {EventEmitter, Injectable, Output} from "@angular/core";
import {AccountsService} from "./accounts.service";
import {Account} from "../shared/account.model";
import {JournalService} from "./journal.service";
import {TransactionStatusType} from "../shared/journal.transaction.model";

@Injectable()
export class ReportsService{
  @Output()accountsChanged = new EventEmitter<Account[]>();

  accounts: Account[] = [];
  dateRange: Date[] = [];

  constructor(private accountsService: AccountsService, private journalService: JournalService){
    this.dateRange = [
      this.getExtremeDate(DateExtremes.Min),
      this.getExtremeDate(DateExtremes.Max)
    ]
  }

  async load(from?: Date, to?: Date){
    const accounts =  await this.accountsService.getAccounts();
    const datesOnly = !from && !to;

    if(!from)
      from = this.getExtremeDate(DateExtremes.Min);
    if(!to)
      to = this.getExtremeDate(DateExtremes.Max);

    await this.filterAccounts(accounts, from, to, datesOnly);

    this.accounts = accounts;

    this.accountsChanged.emit(this.accounts);
  }

  private getExtremeDate(extremum: DateExtremes): Date{
    let value = 8640000000000000;

    if(extremum == DateExtremes.Min)
      value *= -1;

    return new Date(value);
  }

  private async filterAccounts(accounts: Account[], from: Date, to: Date, datesOnly?: boolean){
    let transactions = await this.journalService.getTransactions();

    let dateFrom = to;
    let dateTo = from;

    //Filter by
    transactions = transactions.filter(t => t.createDate >= from && t.createDate <= to);
    //Update each accounts balance from these transactions
    accounts.forEach(account => {
      let newBalance = 0;
      transactions.forEach(t => {
        if(!datesOnly && t.status == TransactionStatusType.Approved) {
          t.entries.forEach(e => {
            if (e.account.id == account.id) {
              newBalance = e.account.normalSide == e.side ? newBalance + e.amount : newBalance - e.amount;
            }
          });
        }

        if(t.createDate < dateFrom)
          dateFrom = t.createDate;

        if(t.createDate > dateTo)
          dateTo = t.createDate;

      });
      if(!datesOnly)
        account.balance = newBalance;
    });

    if(accounts.length == 0){
      dateFrom = from;
      dateTo = to;
    }

    this.dateRange = [dateFrom, dateTo];
  }
}
export enum DateExtremes{
  Min,
  Max
}
