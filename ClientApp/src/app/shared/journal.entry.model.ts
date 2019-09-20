import {Account} from "./account.model";

export class JournalEntry{
  id: number;
  amount: number;
  transactionId: number;
  debit: boolean;
  account: Account;
}
