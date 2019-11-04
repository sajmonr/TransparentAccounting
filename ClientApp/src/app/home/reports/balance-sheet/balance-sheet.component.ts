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
  private accountType = CategoryType;
  private accounts: Account[][] = [];

  private retainedEarnings = 0;

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void {
    this.reportsService.accountsChanged.subscribe(this.loadAccounts.bind(this));
  }

  private loadAccounts(accounts: Account[]){
    const newAccounts: Account[][] = [];

    newAccounts[CategoryType.Assets] = accounts.filter(e => e.category.id == CategoryType.Assets && e.balance > 0);
    newAccounts[CategoryType.Liabilities] = accounts.filter(e => e.category.id == CategoryType.Liabilities && e.balance > 0);
    newAccounts[CategoryType.Equity] = accounts.filter(e => e.category.id == CategoryType.Equity && e.balance > 0);

    this.adjustForContraAccounts(newAccounts);
    this.retainedEarnings = this.calculateNetIncome(accounts);

    this.accounts = newAccounts;
  }

  private adjustForContraAccounts(accounts: Account[][]){
    accounts.forEach(array => {
      array.forEach(account => {
        if(account.contraAccount)
          account.balance *= -1;
      })
    })
  }
  private calculateNetIncome(accounts: Account[]): number{
    const totalRevenues = accounts.filter(account => account.category.id == CategoryType.Revenues).reduce((a, c) => a + c.balance, 0);
    const totalExpenses = accounts.filter(account => account.category.id == CategoryType.Expenses).reduce((a, c) => a + c.balance, 0);
    const dividends = accounts.filter(account => account.subcategory.name == 'Dividends').reduce((a, c) => a + c.balance, 0);

    return totalRevenues - totalExpenses - dividends;
  }

  private getDepreciationForOfficeEquipment(): number{
    const acc = this.accounts[CategoryType.Assets].filter(a => a.name == 'Office Equipment' || a.name == 'Accumulated Depreciation, Office Equipment');
    return acc.reduce((a, c) => a + c.balance, 0);
  }

  private getTotal(accountType: CategoryType[]): number{
    let total = 0;
    accountType.forEach(type => {
      if(this.accounts[type])
        total += this.accounts[type].reduce((a, c) => a + c.balance, 0);
    });

    if(accountType.some(t => t == CategoryType.Equity))
      total += this.retainedEarnings;

    return total;
  }
}
