import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {JournalTransaction, TransactionStatusType, TransactionType} from "../../shared/journal.transaction.model";
import {LoginService} from "../../services/login.service";
import {UserRole} from "../../shared/user-model";
import {JournalService} from "../../services/journal.service";
import {DatePipe, Time} from "@angular/common";
import {JournalAddFormComponent} from "./add-form/journal-add-form.component";
import {NormalSide} from "../../shared/account.model";
import {ActivatedRoute} from "@angular/router";
import {single} from "rxjs/operators";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit, DoCheck{
  @ViewChild('addForm')addForm: JournalAddFormComponent;
  @ViewChild('addModal')addModal: ElementRef;
  private transactionStatusType = TransactionStatusType;
  private transactionType = TransactionType;
  private transactions: JournalTransaction[] = [];
  private viewTransactions: JournalTransaction[] = [];

  private viewEntryId = -1;

  private statusFilter: TransactionStatusType = null;
  private startDateFilter: Date = null;
  private endDateFilter: Date = null;
  private searchFilter = '';

  private resolveTransaction: JournalTransaction;
  private resolveApprove = false;
  private resolveValid = true;
  private resolveComments = '';

  private submitInProgress = false;

  constructor(private changeDetector: ChangeDetectorRef,
              private activatedRouted: ActivatedRoute,
              private apiService: ApiService,
              private http: HttpClient,
              private journals: JournalService,
              private login: LoginService,
              private datePipe: DatePipe){
    activatedRouted.params.subscribe(params => {
      if(params["entryId"]){
        this.viewEntryId = params["entryId"];
      }
    });
  }

  ngOnInit(): void {
    this.registerResolveModalHooks();
    this.loadTransactions();
  }

  ngDoCheck(): void {
    if(this.viewEntryId < 0)
      this.applyFilters();
  }

  private applyFilters(){
    this.viewTransactions = this.transactions.slice();

    this.applyTransactionStatusFilter();
    this.applyTransactionDateFilter(true);
    this.applyTransactionDateFilter(false);

    this.search();
  }

  private onEntryResolve(){
    if(!this.isNullOrWhitespace(this.resolveComments))
      this.resolveTransaction.description += '\n' + this.constructResolveComment(this.resolveComments, this.resolveApprove);

    this.journals.resolveTransaction(this.resolveTransaction, this.resolveApprove).then(this.loadTransactions.bind(this));
  }
  private loadTransactions(){
    this.http.get<JournalTransaction[]>(this.apiService.getUrl(ApiMethod.GetTransactions)).subscribe(transactions => {
      //@ts-ignore
      this.transactions = transactions.sort((left, right) => new Date(right.createDate) - new Date(left.createDate));
      this.viewTransactions = this.viewEntryId > 0 ? transactions.filter(t => t.entries.some(e => e.id == this.viewEntryId)) : transactions.slice();
    });
  }

  private async submitNewEntry(){
    this.submitInProgress = true;

    await this.addForm.submit();

    this.submitInProgress = false;
    console.log('loading');
    this.loadTransactions();
    //@ts-ignore
    $(this.addModal.nativeElement).modal('hide');
  }

  private search(){
    if(this.searchFilter == '')
      return;

    let searchResults;
    searchResults = this.searchByName(this.searchFilter, this.viewTransactions);

    if(searchResults.length == 0){
      //Only match if this is a decimal number
      if(/^\d*\.?\d{0,2}$/.test(this.searchFilter)){
        searchResults = this.searchByAmount(parseInt(this.searchFilter), this.viewTransactions);
      }
    }

    if(searchResults.length == 0){
      const timestamp = Date.parse(this.searchFilter);
      if(!isNaN(timestamp)){
        searchResults = this.searchByDate(new Date(timestamp), this.viewTransactions);
      }
    }

    this.viewTransactions = searchResults;
  }

  private searchByName(name: string, transactions: JournalTransaction[]): JournalTransaction[]{
    name = name.toLowerCase();

    return transactions.filter(t => t.entries.some(e => e.account.name.toLowerCase().includes(name)));
  }
  private searchByAmount(amount: number, transactions: JournalTransaction[]): JournalTransaction[]{
    const amountString = amount.toString();

    return transactions.filter(t => {
      return t.entries.some(e => e.amount.toString().includes(amountString))
        || t.entries.reduce((t, n) => n.side == NormalSide.Left ? t + n.amount : t, 0).toString().includes(amountString);
    });
  }
  private searchByDate(date: Date, transactions: JournalTransaction[]): JournalTransaction[]{
    return transactions.filter(t => {
      const td = new Date(t.createDate);
      return td.getDate() == date.getDate() && td.getMonth() == date.getMonth() && td.getFullYear() == date.getFullYear();
    });
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
    this.applyFilters();
  }

  private applyTransactionStatusFilter(){
    if(this.statusFilter){
      //@ts-ignore
      this.viewTransactions = this.viewTransactions.filter(t => t.status == this.statusFilter);
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

  private registerResolveModalHooks() {
    //@ts-ignore
    $('#modal-resolve-journal-entry').on('show.bs.modal', function (event) {
      //@ts-ignore
      const transactionId = $(event.relatedTarget).data('transaction');
      // noinspection all
      this.resolveTransaction = this.transactions.filter(t => t.id == transactionId)[0];
      //@ts-ignore
      //noinspection all
      this.resolveApprove = $(event.relatedTarget).data('approve');

      this.resolveComments = '';

      //disable the button for rejection because user must enter comments
      if(!this.resolveApprove)
        this.resolveValid = false;

      //noinspection all
      this.changeDetector.detectChanges();
    }.bind(this));
  }

  private approveCommentsChanged(value: string){
    this.resolveValid = !this.isNullOrWhitespace(value);
  }

  private isNullOrWhitespace(value: string): boolean{
    return value === null || value.match(/^ *$/) != null;
  }
  private constructResolveComment(reason: string, approved: boolean): string{
    return 'Transaction was ' + (approved ? 'approved' : 'rejected') + ' on ' + this.datePipe.transform(new Date()) + ': ' + reason;
  }
}
