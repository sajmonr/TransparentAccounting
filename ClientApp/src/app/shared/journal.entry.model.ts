import {Account} from "./account.model";

export class JournalEntry{
  id: number;
  accountCredit: Account;
  accountDebit: Account;
  amount: number;
}
