import {Component, Input} from "@angular/core";
import {LedgerEntry} from "../../../shared/ledger.entry.model";

@Component({
  selector: 'app-ledger-entry',
  templateUrl: './ledger-entry.component.html',
  styleUrls: ['./ledger-entry.component.css']
})
export class LedgerEntryComponent {

  @Input() entries: LedgerEntry[] = [];
  @Input() sectionTitle: string;

  constructor() {}
}
