import {Component, OnInit} from "@angular/core";
import {CategoryType} from "../../../shared/category.model";
import {Account} from "../../../shared/account.model";
import {ReportsService} from "../../../services/reports.service";

@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.less', '../reports.component.less']
})
export class IncomeStatementComponent implements OnInit{
  private expenses: Account[] = [];
  private revenues: Account[] = [];

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void {
    this.reportsService.accountsChanged.subscribe(this.loadAccounts.bind(this));
  }

  private loadAccounts(accounts: Account[]){
    const newExpenses = accounts.filter(e => e.category.id == CategoryType.Expenses && e.balance > 0);
    const newRevenues = accounts.filter(e => e.category.id == CategoryType.Revenues && e.balance > 0);

    this.expenses = newExpenses;
    this.revenues = newRevenues;
  }
  private getTotal(entries: Account[]): number{
    return entries.reduce((a, c) => a + c.balance, 0);
  }
}
