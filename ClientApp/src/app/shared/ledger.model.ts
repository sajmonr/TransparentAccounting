import {LedgerEntry} from "./ledger.entry.model";


export class Ledger {

  public ledgerEntries: LedgerEntry[];
  public name: string;
  public date: Date;

  constructor(ledgerEntries, name: string, date: Date) {
    this.ledgerEntries = ledgerEntries;
    this.name = name;
    this.date = date;
  }

}
