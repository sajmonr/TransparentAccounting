import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Account} from "../../../shared/account.model";
import {AccountsService} from "../../../services/accounts.service";
import {JournalEntry} from "../../../shared/journal.entry.model";
import {JournalTransaction, TransactionType} from "../../../shared/journal.transaction.model";
import {LoginService} from "../../../services/login.service";
import {User} from "../../../shared/user-model";
import {JournalService} from "../../../services/journal.service";
import {MessageService} from "../../../services/message.service";
import {BootstrapOptions} from "@angular/core/src/application_ref";

@Component({
  selector: 'app-journal-add-form',
  templateUrl: './journal-add-form.component.html',
  styleUrls: ['./journal-add-form.component.css']
})
export class JournalAddFormComponent implements OnInit, DoCheck{
  @ViewChild('newForm')newForm: NgForm;
  private transactionType = TransactionType;
  private addNewEntryTimeout;
  private allAccounts: Account[] = [];
  private journalEntries: JournalEntry[] = [];

  private journalEntriesTouched = false;
  private journalEntriesErrors: string[] = [];

  valid = false;

  constructor(private accountsService: AccountsService,
              private journalService: JournalService,
              private loginService: LoginService,
              private messages: MessageService){}

  ngOnInit(): void {
    this.reset();
    this.accountsService.getAccounts().then(accounts => {
      this.allAccounts = accounts.slice();
    });
  }

  ngDoCheck(): void {
    this.checkJournalEntries();

    this.valid = this.journalEntriesTouched && this.journalEntriesErrors.length == 0;
  }

  private onUpdateEntries(){
    this.journalEntriesTouched = true;

    if(this.addNewEntryTimeout){
      clearTimeout(this.addNewEntryTimeout);
    }
    this.addNewEntryTimeout = setTimeout(this.addNewEntry.bind(this), 500);
  }

  private onEntryDelete(entry: JournalEntry){
    const index = this.journalEntries.indexOf(entry);
    if(index >= 0 && index != this.journalEntries.length - 1){
      this.journalEntries.splice(index, 1);
    }
  }

  private addNewEntry(){
    this.addNewEntryTimeout = null;

    const lastIndex = this.journalEntries.length - 1;

    if(lastIndex >= 0){
      const lastEntry = this.journalEntries[this.journalEntries.length - 1 ];

      if(lastEntry.amount == 0 || lastEntry.account.id == 0){
        return;
      }
    }

    this.journalEntries.push(new JournalEntry());
  }

  private trackByEntries(index, item){
    return item.account.id;
  }

  private getAvailableAccounts(currentEntry: JournalEntry): Account[]{
    let accounts = this.allAccounts.slice();
    let accountsToRemove = [];

    this.journalEntries.forEach(entry => {
      if(entry.account.id != currentEntry.account.id){
        accountsToRemove.push(entry.account.id);
      }
    });

    accountsToRemove.forEach(accountId => {
      accounts.splice(accounts.findIndex( a => a.id == accountId), 1);
    });

    return accounts;
  }

  private validateForm(): string{
    if(!this.validateDebitCreditCount())
      return 'There must be at least one credit and one debit.';
    //Debit == Credit
    if(!this.validateDebitCreditEqual())
      return 'Debits and credits must be equal.';

    return null;
  }

  private validateDebitCreditCount(): boolean{
    let debit = 0;
    let credit = 0;

    this.journalEntries.forEach(entry => {
      if(entry.debit)
        debit++;
      else
        credit++;
    });

    return debit > 0 && credit > 0;
  }

  private validateDebitCreditEqual(): boolean{
    let debit = 0;
    let credit = 0;

    this.journalEntries.forEach(entry => {
      if(entry.debit)
        debit += entry.amount;
      else
        credit += entry.amount;
    });

    return debit == credit;
  }

  private checkJournalEntries(){
    if(!this.journalEntriesTouched)
      return;

    let newErrors: string[] = [];

    if(!this.validateDebitCreditCount())
      newErrors.push('There must be at least one debit and one credit entry.');
    if(!this.validateDebitCreditEqual())
      newErrors.push('Credits and debits must be equal.');

    this.journalEntriesErrors = newErrors;
  }

  submit(){
    const error = this.validateForm();
    if(error){
      this.messages.error('Uh-oh', error);
      return;
    }

    const transaction = new JournalTransaction();
    const createdBy = new User();

    createdBy.id = this.loginService.getCurrentUser().id;

    transaction.description = this.newForm.value.description;
    transaction.createdBy = createdBy;
    transaction.entries = this.journalEntries.filter(entry => entry.amount > 0 && entry.account.id > 0);

    this.journalService.addTransaction(transaction);
  }

  reset(){
    this.newForm.resetForm();

    this.journalEntriesTouched = false;
    this.journalEntriesErrors = [];

    this.journalEntries.splice(0, this.journalEntries.length);
    this.addNewEntry();
  }

}
