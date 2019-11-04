import {Component, OnInit} from "@angular/core";
import {ReportsService} from "../../../services/reports.service";
import {Account} from "../../../shared/account.model";
import {CategoryType} from "../../../shared/category.model";
import {Subcategory} from "../../../shared/subcategory.model";
import {ApiMethod, ApiService} from "../../../services/api.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-retained-earnings-statement',
  templateUrl: './retained-earnings-statement.component.html',
  styleUrls: ['./retained-earnings-statement.component.less', '../reports.component.less']
})
export class RetainedEarningsStatementComponent implements OnInit{
  private netIncome = 0;
  private retainedEarningsStart = 0;
  private dividends = 0;

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void {
    this.reportsService.accountsChanged.subscribe(this.loadAccounts.bind(this));
  }

  private loadAccounts(accounts: Account[]){
    this.netIncome = this.calculateNetIncome(accounts);
    this.dividends = this.calculateDividends(accounts);
  }

  private calculateNetIncome(accounts: Account[]): number{
    const totalRevenues = accounts.filter(account => account.category.id == CategoryType.Revenues).reduce((a, c) => a + c.balance, 0);
    const totalExpenses = accounts.filter(account => account.category.id == CategoryType.Expenses).reduce((a, c) => a + c.balance, 0);
    const dividends = accounts.filter(account => account.subcategory.name == 'Dividends').reduce((a, c) => a + c.balance, 0);

    return totalRevenues - totalExpenses - dividends;
  }
  private calculateDividends(accounts: Account[]){
    return accounts.filter(account => account.subcategory.name == 'Dividends').reduce((a, c) => a + c.balance, 0);
  }
}
