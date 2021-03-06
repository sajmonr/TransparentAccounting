import {Component, DoCheck, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {JournalTransaction, TransactionStatusType} from "../../shared/journal.transaction.model";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {LedgerEntry} from "../../shared/ledger.entry.model";
import {Account, NormalSide} from "../../shared/account.model";
import {Ledger} from "../../shared/ledger.model";

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit, DoCheck{
  private accountId = 0;
  private accounts: Account[] = [];
  private selectedAccounts: Account[] = [];
  private transactions: JournalTransaction[] = [];
  private viewTransactions: JournalTransaction[] = [];
  private ledgers: Ledger[] = [];
  private ledgersCopy: Ledger[] = [];
  private balance = 0;
  private startDateFilter: Date = null;
  private endDateFilter: Date = null;
  private searchFilter = '';

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private http: HttpClient){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(this.loadRouteParams.bind(this));
    this.http.get<Account[]>(this.apiService.getUrl(ApiMethod.GetAccounts)).subscribe(accounts => {
      this.accounts = accounts;
      this.http.get<JournalTransaction[]>(this.apiService.getUrl(ApiMethod.GetTransactions)).subscribe(transactions => {
        this.transactions = transactions;
        this.viewTransactions = transactions;
        this.populateData(accounts);
      });
    });
  }

  private getLedgerEntries(ledgerEntries) {
    return ledgerEntries;
  }

  private populateData(accounts) {
    if (this.accountId != 0) {
      this.selectedAccounts = [];
      this.selectedAccounts.push(this.findAccountById(this.accountId));
      this.getEntries();
    } else {
      this.selectedAccounts = accounts;
      this.getEntries();
    }
  }

  private getEntries() {
    this.balance = 0;
    this.sortTransactions();
    let ledgers: Ledger[] = [];
    this.selectedAccounts.forEach( account => {
      let ledgerEntries: LedgerEntry[] = [];
      this.transactions.forEach(transaction => {
        let entries = transaction.entries.filter(t => t.account.id == account.id);
        let createDate = transaction.createDate;

        entries.forEach(entry => {
          if (entry.side == 0) {
            this.balance += this.getDebitBalance(entry, account);
            ledgerEntries.push(new LedgerEntry(transaction.description, createDate, entry, this.balance, true));
          }
          if (entry.side == 1) {
            this.balance += this.getCreditBalance(entry, account);
            ledgerEntries.push(new LedgerEntry(transaction.description, createDate, entry, this.balance, false));
          }
          createDate = null;
        });

      });
      if (ledgerEntries.length != 0) {
        ledgers.push(new Ledger(ledgerEntries, account.name));
      }
    });

    this.ledgers = ledgers;
    this.ledgersCopy = ledgers.slice();
  }

  private sortTransactions() {
    this.transactions.sort((a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime());
  }

  private getDebitBalance(entry, account) {
    return account.normalSide == 0 ? entry.amount : entry.amount * -1;
  }

  private getCreditBalance(entry, account) {
    return account.normalSide == 1 ? entry.amount : entry.amount * -1;
  }

  private findAccountById(id) {
    return this.accounts.find(account => account.id == id);
  }

  private loadRouteParams(params: Params){
    this.accountId = params['accountId'] ? params['accountId'] : 0;
  }

  private setDateFilter(date: string, start: boolean){
    const filterDate = date ? new Date(date) : null;
    if(start){
      this.startDateFilter = filterDate;
    }else{
      this.endDateFilter = filterDate;
    }
  }

  private searchByName(name: string){
    name = name.toLowerCase();

    return this.accounts.filter(account => account.name.toLowerCase().search(name) != -1);
  }
  private searchByAmount(amount: number, transactions: JournalTransaction[]): JournalTransaction[]{
    const amountString = amount.toString();

    return transactions.filter(t => {
      return t.entries.some(e => e.amount.toString().includes(amountString))
        || t.entries.reduce((t, n) => n.side == NormalSide.Left ? t + n.amount : t, 0).toString().includes(amountString);
    });
  }

  private search(){
    if(this.searchFilter == '') {
      if (this.accounts != null && this.accounts.length != 0) {
        this.populateData(this.accounts);
      }
      return;
    }

    this.selectedAccounts = this.searchByName(this.searchFilter);

    let searchResults: JournalTransaction[];

    let accounts: Account[] = [];

    if(this.selectedAccounts.length == 0){
      let query = this.searchFilter;
      //Only match if this is a decimal number
      if(/^\d*\.?\d{0,2}$/.test(this.searchFilter)){
        searchResults = this.searchByAmount(parseInt(this.searchFilter), this.viewTransactions);
      }
      this.viewTransactions.forEach(transaction => transaction.entries.forEach(entry => {
        if (entry.account.accountId.toString().search(query) != -1 && !this.isDuplicate(entry.account, accounts)) {
          accounts.push(entry.account);
        }
      }));
      this.selectedAccounts = accounts;
    }

    if (searchResults != null) {
      searchResults.forEach(transactions => {
        transactions.entries.forEach(entry => {
          let filteredAccounts = this.accounts.filter(account => account.id == entry.account.id);
          filteredAccounts.forEach(account => {
            if (!this.isDuplicate(account, accounts)) {
              accounts.push(account);
            }
          });
        });
      });
      this.selectedAccounts = accounts;
    }

    this.populateData(this.selectedAccounts);

  }

  private isDuplicate(newAccount: Account, accounts) {
    for (let account of accounts) {
      if (account.accountId == newAccount.accountId) {
        return true;
      }
    }
    return false;
  }

  ngDoCheck(): void {
    this.applyFilters();
  }

  private applyFilters(){
    this.viewTransactions = this.transactions.slice();

    this.search();

    this.applyTransactionDateFilter(true);
    this.applyTransactionDateFilter(false);

  }

  private applyTransactionDateFilter(start: boolean){
    if (this.startDateFilter && this.endDateFilter) {
      this.ledgers = this.ledgersCopy.slice();
      this.ledgers.forEach(ledger => ledger.ledgerEntries = ledger.ledgerEntries.filter(entry => new Date(entry.createDate).getUTCDate() <= this.endDateFilter.getUTCDate() && new Date(entry.createDate).getUTCDate() >= this.startDateFilter.getUTCDate()));
      return;
    }
    if(start && this.startDateFilter || !start && this.endDateFilter){
      this.ledgers = this.ledgersCopy.slice();
      if(start){
        this.ledgers.forEach(ledger => ledger.ledgerEntries = ledger.ledgerEntries.filter(entry => new Date(entry.createDate).getUTCDate() >= this.startDateFilter.getUTCDate()));
      } else {
        this.ledgers.forEach(ledger => ledger.ledgerEntries = ledger.ledgerEntries.filter(entry => new Date(entry.createDate).getUTCDate() <= this.endDateFilter.getUTCDate()));      }
    }

  }
}
