import {Component} from "@angular/core";
import {Account, NormalSide} from "../../../shared/account.model";
import {ReportsService} from "../../../services/reports.service";

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.less', '../reports.component.less']
})
export class TrialBalanceComponent{
  private normalSide = NormalSide;
  private accounts:Account[] = [];

  private firstAccounts: Account[] = [];

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void {
    this.reportsService.accountsChanged.subscribe(this.loadAccounts.bind(this));
  }

  private loadAccounts(accounts: Account[]){
    const tmpAccounts = accounts.filter(a => a.balance > 0).sort((a, b) => a.accountId - b.accountId);

    const firstCredit = tmpAccounts.findIndex(a => a.normalSide == NormalSide.Left && !a.contraAccount);
    const firstDebit = tmpAccounts.findIndex(a => a.normalSide == NormalSide.Right && !a.contraAccount);

    this.firstAccounts = [tmpAccounts[firstCredit], tmpAccounts[firstDebit]];

    this.accounts = tmpAccounts;
  }

  private getTotal(accounts: Account[], normalSide: NormalSide): number{
    return this.accounts.filter(a => a.normalSide == normalSide).reduce((a, c) => a + c.balance, 0);
  }
}
