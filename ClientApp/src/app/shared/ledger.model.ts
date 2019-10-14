import {LedgerEntry} from "./ledger.entry.model";


export class Ledger {

  public ledgerEntries: LedgerEntry[];
  public name: string;

  constructor(ledgerEntries, name: string) {
    this.ledgerEntries = ledgerEntries;
    this.name = name;
  }

}
