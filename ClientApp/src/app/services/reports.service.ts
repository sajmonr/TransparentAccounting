import {EventEmitter, Injectable, Output} from "@angular/core";
import {AccountsService} from "./accounts.service";
import {Account} from "../shared/account.model";
import {JournalService} from "./journal.service";
import {TransactionStatusType} from "../shared/journal.transaction.model";

@Injectable()
export class ReportsService{
  @Output()accountsChanged = new EventEmitter<Account[]>();

  accounts: Account[] = [];

  constructor(private accountsService: AccountsService, private journalService: JournalService){}

  async load(from?: Date, to?: Date){
    const accounts =  await this.accountsService.getAccounts();

    if(from || to){
      if(!from)
        from = new Date(-8640000000000000);
      if(!to)
        to = new Date(8640000000000000);

      await this.filterAccounts(accounts, from, to);
    }

    this.accounts = accounts;
    this.accountsChanged.emit(this.accounts);
  }

  private async filterAccounts(accounts: Account[], from: Date, to: Date){
    let transactions = await this.journalService.getTransactions();
    //Filter by
    transactions = transactions.filter(t => t.createDate >= from && t.createDate <= to);
    //Update each accounts balance from these transactions
    accounts.forEach(account => {
      let newBalance = 0;
      transactions.forEach(t => {
        if(t.status == TransactionStatusType.Approved) {
          t.entries.forEach(e => {
            if (e.account.id == account.id) {
              newBalance = e.account.normalSide == e.side ? newBalance + e.amount : newBalance - e.amount;
            }
          });
        }
      });
      account.balance = newBalance;
    });
  }
}
