import {Component, Input} from "@angular/core";
import {JournalEntry} from "../../../shared/journal.entry.model";
import {NormalSide} from "../../../shared/account.model";

@Component({
  selector: 'app-journal-entries-list',
  templateUrl: './journal.entries.list.component.html',
  styleUrls: ['./journal.entries.list.component.css']
})
export class JournalEntriesListComponent{
  @Input() entries: JournalEntry[];

  private getDebits(): JournalEntry[]{
    return this.entries.filter(a => a.side == NormalSide.Left);
  }
  private getCredits(): JournalEntry[]{
    return this.entries.filter(a => a.side == NormalSide.Right);
  }
}
