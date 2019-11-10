import {Component, OnInit} from "@angular/core";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {EmailMessage} from "../../shared/email.message.model";
import {MessageService} from "../../services/message.service";
import {Account} from "../../shared/account.model";
import {Ratio} from "../../shared/ratio.model";
import {Category, CategoryType} from "../../shared/category.model";
import {JournalTransaction, TransactionStatusType, TransactionType} from "../../shared/journal.transaction.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private accounts: Account[] = [];
  private currentRatio: Ratio;
  private quickRatio: Ratio;
  private debtRatio: Ratio;
  private returnOnEquityRatio: Ratio;
  private returnOnAssetsRatio: Ratio;
  private assetTurnoverRatio: Ratio;
  private transactions: JournalTransaction[] = [];
  private transactionType = TransactionType;
  private category = Category;
  private transactionStatusType = TransactionStatusType;
  private DEPRECIATION = 21;
  private EQUIPMENT = 8;
  private CONTRIBUTED_CAPITAL = 9;

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
    this.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.getCurrentRatio();
      this.getQuickRatio();
      this.getTransactions();
      this.getDebtRatio();
      this.getReturnOnEquity();
      this.getReturnOnAssets();
      this.getAssetTurnover()
    });
  }

  getTransactions() {
    this.httpClient.get<JournalTransaction[]>(this.apiService.getUrl(ApiMethod.GetTransactions)).subscribe(transactions => this.transactions = transactions);
  }

  getCurrentRatio() {
    let assets = this.getAccountsByCategoryId(1);
    let liabilities = this.getAccountsByCategoryId(2);
    let assetTotal = this.getCurrentAssets(assets);
    let liabilityTotal = 0;
    liabilities.forEach(liability => liabilityTotal += liability.balance);
    let currentRatio = assetTotal / liabilityTotal;
    let currentRatioPercentage = (currentRatio / 4) * 100;
    this.currentRatio = new Ratio(currentRatio, currentRatioPercentage, "Current Ratio", 1.5, 2, 4);
  }

  getQuickRatio() {
    let assets = this.getAccountsByCategoryId(1);
    let liabilities = this.getAccountsByCategoryId(2);
    let assetTotal = this.getCurrentAssets(assets);
    let liabilityTotal = 0;
    liabilities.forEach(liability => liabilityTotal += liability.balance);
    let currentRatio = assetTotal / liabilityTotal;
    let currentRatioPercentage = (currentRatio / 2) * 100;
    this.quickRatio = new Ratio(currentRatio, currentRatioPercentage, "Quick Ratio", 0.5, 1, 2);
  }

  getDebtRatio() {
    let assets = this.getAccountsByCategoryId(1);
    let liabilities = this.getAccountsByCategoryId(2);

    let assetTotal = 0;
    assets.forEach(asset => assetTotal += asset.balance);
    let liabilityTotal = 0;
    liabilities.forEach(liability => liabilityTotal += liability.balance);

    let debtRatio = liabilityTotal / assetTotal;
    let debtRatioPercentage = debtRatio * 100;
    this.debtRatio = new Ratio(debtRatio, debtRatioPercentage, "Debt Ratio", 1, .6, 0.4);
    this.debtRatio.isInverted = true;
  }

  getReturnOnEquity() {
    const shareholdersEquity = this.accounts.find(account => account.subcategory.id == this.CONTRIBUTED_CAPITAL);
    const netIncome = this.calculateNetIncome(this.accounts);

    let returnOnEquity = netIncome / shareholdersEquity.balance;
    let returnOnEquityPercentage = returnOnEquity * 100;
    this.returnOnEquityRatio = new Ratio(returnOnEquity, returnOnEquityPercentage, "Return On Equity", 0.15, .25, 1)
  }

  getReturnOnAssets() {
    let assets = this.getAccountsByCategoryId(1);
    let assetTotal = 0;
    assets.forEach(asset => assetTotal += asset.balance);

    const netIncome = this.calculateNetIncome(this.accounts);

    let returnOnAssets = netIncome / assetTotal;
    let returnOnAssetsPercentage = returnOnAssets * 100;
    this.returnOnAssetsRatio = new Ratio(returnOnAssets, returnOnAssetsPercentage, "Return On Assets", 0.05, .2, 1)
  }

  getAssetTurnover() {
    let assets = this.getAccountsByCategoryId(1);
    let revenues = this.getAccountsByCategoryId(3);

    let assetTotal = 0;
    assets.forEach(asset => assetTotal += asset.balance);
    let revenueTotal = 0;
    revenues.forEach(revenue => revenueTotal += revenue.balance);

    let assetTurnover = revenueTotal / assetTotal;
    let assetTurnoverPercentage = (assetTurnover / 4) * 100;
    this.assetTurnoverRatio = new Ratio(assetTurnover, assetTurnoverPercentage, "Asset Turnover", 0.75, 2, 4)
  }

  private getCurrentAssets(assets: Account[]) {
    let assetTotal = 0;
    assets.forEach(asset => {
      const subcategoryId = asset.subcategory.id;
      if (subcategoryId != this.EQUIPMENT && subcategoryId != this.DEPRECIATION) {
        assetTotal += asset.balance
      }
    });
    return assetTotal;
  }

  private calculateNetIncome(accounts: Account[]): number{
    const totalRevenues = accounts.filter(account => account.category.id == CategoryType.Revenues).reduce((a, c) => a + c.balance, 0);
    const totalExpenses = accounts.filter(account => account.category.id == CategoryType.Expenses).reduce((a, c) => a + c.balance, 0);
    const dividends = accounts.filter(account => account.subcategory.name == 'Dividends').reduce((a, c) => a + c.balance, 0);

    return totalRevenues - totalExpenses - dividends;
  }

  getAccountsByCategoryId(categoryId: number) {
    return this.accounts.filter(account => account.category.id == categoryId)
  }

  hasPendingTransactions() {
    let pending = this.transactions.filter(transaction => transaction.status == this.transactionStatusType.Pending)
    return pending.length > 0;
  }
}
