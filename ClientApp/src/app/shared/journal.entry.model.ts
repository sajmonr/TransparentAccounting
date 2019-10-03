import {Account} from "./account.model";

export class JournalEntry{
  id: number;
  amount: number;
  transactionId: number;
  debit: boolean;
  account: Account;

  constructor(){
    this.id = 0;
    this.amount = 0;
    this.transactionId = 0;
    this.debit = true;
    this.account = new Account();
  }

}
