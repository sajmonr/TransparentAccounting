import {JournalEntry} from "./journal.entry.model";

export class LedgerEntry{
  id: number;
  description: string;
  createDate: Date;
  credit: number;
  debit: number;
  balance: number;

  constructor(description, createDate, journalEntry: JournalEntry, balance, isDebit) {
    this.description = description;
    this.createDate = createDate;
    this.credit = !isDebit ? journalEntry.amount : null;
    this.debit = isDebit ? journalEntry.amount : null;
    this.balance = balance;
    this.id = journalEntry.id;
  }

}
