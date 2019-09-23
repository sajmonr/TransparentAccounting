import {Component, Input} from "@angular/core";
import {JournalEntry} from "../../../shared/journal.entry.model";

@Component({
  selector: 'app-journal-entries-list',
  templateUrl: './journal.entries.list.component.html',
  styleUrls: ['./journal.entries.list.component.css']
})
export class JournalEntriesListComponent{
  @Input() entries: JournalEntry[];

  private getDebits(): JournalEntry[]{
    return this.entries.filter(a => a.debit);
  }
  private getCredits(): JournalEntry[]{
    return this.entries.filter(a => !a.debit);
  }
}
