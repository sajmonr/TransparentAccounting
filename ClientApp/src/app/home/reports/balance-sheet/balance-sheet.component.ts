import {Component} from "@angular/core";
import {Account} from "../../../shared/account.model";
import {ReportsService} from "../../../services/reports.service";
import {CategoryType} from "../../../shared/category.model";

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.less', '../reports.component.less']
})
export class BalanceSheetComponent{
  private assets: Account[] = [];
  private liabilities: Account[] = [];
  private equity: Account[] = [];

  private accountType = CategoryType;
  private accounts: Account[][] = [];

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void {
    this.reportsService.accountsChanged.subscribe(this.loadAccounts.bind(this));
  }

  private loadAccounts(accounts: Account[]){
    const newAccounts: Account[][] = [];

    newAccounts[CategoryType.Assets] = accounts.filter(e => e.category.id == CategoryType.Assets && e.balance > 0);
    newAccounts[CategoryType.Liabilities] = accounts.filter(e => e.category.id == CategoryType.Liabilities && e.balance > 0);
    newAccounts[CategoryType.Equity] = accounts.filter(e => e.category.id == CategoryType.Equity && e.balance > 0);

    this.accounts = newAccounts;
  }

  private getTotal(accountType: CategoryType): number{
    return this.accounts[accountType].reduce((a, c) => a + c.balance, 0);
  }
}
