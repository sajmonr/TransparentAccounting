import {Component, DoCheck, OnChanges, OnInit} from "@angular/core";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {JournalTransaction, TransactionStatusType, TransactionType} from "../../shared/journal.transaction.model";
import {LoginService} from "../../services/login.service";
import {UserRole} from "../../shared/user-model";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit, DoCheck{
  private transactionStatusType = TransactionStatusType;
  private transactionType = TransactionType;
  private transactions: JournalTransaction[] = [];
  private viewTransactions: JournalTransaction[] = [];

  private statusFilter: TransactionStatusType = null;
  private startDateFilter: Date = null;
  private endDateFilter: Date = null;

  constructor(private apiService: ApiService, private http: HttpClient, private login: LoginService){}

  ngOnInit(): void {
    this.loadTransactions();
  }

  ngDoCheck(): void {
    this.applyFilters();
  }

  private loadTransactions(){
    this.http.get<JournalTransaction[]>(this.apiService.getUrl(ApiMethod.GetTransactions)).subscribe(transactions => {
      this.transactions = transactions;
      this.viewTransactions = transactions.slice();
    });
  }

  private applyFilters(){
    this.viewTransactions = this.transactions.slice();

    this.applyTransactionStatusFilter();
    this.applyTransactionDateFilter(true);
    this.applyTransactionDateFilter(false);
    console.log('updating...');
  }

  private setDateFilter(date: string, start: boolean){
    const filterDate = date ? new Date(date) : null;
    if(start){
      this.startDateFilter = filterDate;
    }else{
      this.endDateFilter = filterDate;
    }
  }

  private filterTest(data){
    if(!data){
      console.log('nothing');
    }
    console.log(data);
    console.log(new Date(data));

    this.transactions.forEach(t => {
      console.log(new Date(t.createDate));
    })
  }

  private applyTransactionStatusFilter(){
    if(this.statusFilter){
      //@ts-ignore
      this.viewTransactions = this.viewTransactions.filter(t => t.status == TransactionStatusType[this.statusFilter]);
    }
  }
  private applyTransactionDateFilter(start: boolean){
    if(start && this.startDateFilter || !start && this.endDateFilter){
      if(start){
        this.viewTransactions = this.viewTransactions.filter(t => new Date(t.createDate) >= this.startDateFilter);
      }else {
        this.viewTransactions = this.viewTransactions.filter(t => new Date(t.createDate) <= this.endDateFilter);
      }
    }
  }
  private canUserPost(): boolean{
    //this should be allowed for manger only
    return this.login.currentUserRole() == UserRole.Manager || this.login.currentUserRole() == UserRole.Administrator;
  }
}
