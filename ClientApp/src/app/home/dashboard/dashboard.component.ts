import {Component, OnInit} from "@angular/core";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {EmailMessage} from "../../shared/email.message.model";
import {MessageService} from "../../services/message.service";
import {Account} from "../../shared/account.model";
import {Ratio} from "../../shared/ratio.model";
import {CategoryType} from "../../shared/category.model";
import {JournalTransaction, TransactionStatusType, TransactionType} from "../../shared/journal.transaction.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private accounts: Account[] = [];
  private currentRatio: Ratio;
  private quickRatio: Ratio;
  private transactions: JournalTransaction[] = [];
  private transactionType = TransactionType;
  private transactionStatusType = TransactionStatusType;

  constructor(private apiService: ApiService, private httpClient: HttpClient, private messageService: MessageService){}

  onSendEmail(){
    let message = new EmailMessage();

    this.httpClient.post<EmailMessage>(this.apiService.getUrl(ApiMethod.SendEmail), message).subscribe((response) => {
      console.log('done');
    })
  }

  private getAccounts() {
    return this.httpClient.get<Account[]>(this.apiService.getUrl(ApiMethod.GetAccounts));
  }

  ngOnInit(): void {
    this.getCurrentRatio();
    this.getQuickRatio();
    this.getTransactions();
  }

  getTransactions() {
    this.httpClient.get<JournalTransaction[]>(this.apiService.getUrl(ApiMethod.GetTransactions)).subscribe(transactions => this.transactions = transactions);
  }

  getCurrentRatio() {
    this.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      let assets = this.getAccountsByCategoryId(1);
      let liabilities = this.getAccountsByCategoryId(2);
      let assetTotal = 0;
      let liabilityTotal = 0;
      assets.forEach(asset => assetTotal += asset.balance);
      liabilities.forEach(liability => liabilityTotal += liability.balance);
      let currentRatio = assetTotal / liabilityTotal;
      let currentRatioPercentage = (currentRatio / 4) * 100;
      this.currentRatio = new Ratio(currentRatio, currentRatioPercentage, "Current Ratio", 1.5, 2, 4)
    });
  }

  getQuickRatio() {
    this.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      let assets = this.getAccountsByCategoryId(1);
      let liabilities = this.getAccountsByCategoryId(2);
      let assetTotal = 0;
      let liabilityTotal = 0;
      assets.forEach(asset => assetTotal += asset.balance);
      liabilities.forEach(liability => liabilityTotal += liability.balance);
      let currentRatio = assetTotal / liabilityTotal;
      let currentRatioPercentage = (currentRatio / 2) * 100;
      this.quickRatio = new Ratio(currentRatio, currentRatioPercentage, "Quick Ratio", 0.5, 1, 2)
    });
  }

  getAccountsByCategoryId(categoryId: number) {
    return this.accounts.filter(account => account.category.id == categoryId)
  }

  hasPendingTransactions() {
    let pending = this.transactions.filter(transaction => transaction.status == this.transactionStatusType.Pending)
    return pending.length > 0;
  }
}
