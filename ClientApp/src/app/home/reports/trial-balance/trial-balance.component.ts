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

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void {
    this.reportsService.accountsChanged.subscribe(this.loadAccounts.bind(this));
  }

  private loadAccounts(accounts: Account[]){
    this.accounts = accounts.filter(a => a.balance > 0).sort((a, b) => a.accountId - b.accountId);
  }

  private getTotal(accounts: Account[], normalSide: NormalSide): number{
    return this.accounts.filter(a => a.normalSide == normalSide).reduce((a, c) => a + c.balance, 0);
  }
}
