import {Account, NormalSide} from "./account.model";

export class JournalEntry{
  id: number;
  amount: number;
  transactionId: number;
  side: NormalSide;
  account: Account;

  constructor(){
    this.id = 0;
    this.amount = 0;
    this.transactionId = 0;
    this.side = NormalSide.Left;
    this.account = new Account();
  }

}
