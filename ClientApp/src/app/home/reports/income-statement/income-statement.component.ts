import {Component, OnInit} from "@angular/core";
import {JournalService} from "../../../services/journal.service";
import {JournalEntry} from "../../../shared/journal.entry.model";
import {CategoryType} from "../../../shared/category.model";

@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.less', '../reports.component.less']
})
export class IncomeStatementComponent implements OnInit{
  private expenses: JournalEntry[] = [];
  private revenues: JournalEntry[] = [];

  constructor(private journalService: JournalService){}

  ngOnInit(): void {
    this.journalService.getEntries().then(this.loadEntries.bind(this));
  }

  private loadEntries(entries: JournalEntry[]){
    const newExpenses = entries.filter(e => e.account.category.id == CategoryType.Expenses);
    const newRevenues = entries.filter(e => e.account.category.id == CategoryType.Revenues);

    this.expenses = newExpenses;
    this.revenues = newRevenues;
  }

  private getTotal(entries: JournalEntry[]): number{
    return entries.reduce((a, c) => a + c.amount, 0);
  }
}
