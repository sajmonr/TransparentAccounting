import {Component, DoCheck, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Account, NormalSide} from "../../../shared/account.model";
import {AccountsService} from "../../../services/accounts.service";
import {JournalEntry} from "../../../shared/journal.entry.model";
import {JournalTransaction, TransactionType} from "../../../shared/journal.transaction.model";
import {LoginService} from "../../../services/login.service";
import {User} from "../../../shared/user-model";
import {JournalService} from "../../../services/journal.service";
import {MessageService} from "../../../services/message.service";
import {FileService} from "../../../services/file.service";
import {Attachement} from "../../../shared/attachement.model";

@Component({
  selector: 'app-journal-add-form',
  templateUrl: './journal-add-form.component.html',
  styleUrls: ['./journal-add-form.component.css']
})
export class JournalAddFormComponent implements OnInit, DoCheck{
  @ViewChild('newForm')newForm: NgForm;
  private normalSide = NormalSide;
  private addNewEntryTimeout;
  private allAccounts: Account[] = [];
  private journalEntries: JournalEntry[] = [];
  private files: File[] = [];
  private uploadProgress = -1;

  private journalEntriesTouched = false;
  private journalEntriesErrors: string[] = [];

  valid = false;

  constructor(private accountsService: AccountsService,
              private journalService: JournalService,
              private loginService: LoginService,
              private messages: MessageService,
              private filesService: FileService){}

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

  private onFileSelected(files: FileList){
    for(let i = 0; i < files.length; i++){
      let file = files[i];
      if(!this.files.some(f => f.name == file.name)){
        this.files.push(file);
      }
    }
  }
  private async uploadFiles(): Promise<Attachement[]>{
    return new Promise<Attachement[]>(resolve => {
      this.filesService.progress.subscribe(this.onUploadProgress.bind(this));
      this.filesService.uploadFinished.subscribe(files => {
        const attachments: Attachement[] = [];

        files.forEach(f => {
          const a = new Attachement();
          a.name = f.name;
          a.path = f.path;

          attachments.push(a);
        });

        resolve(attachments);
      });
      this.filesService.upload(this.files);
    });
  }
  private onFileDelete(index: number){
    this.files.splice(index, 1);
  }
  private onUploadProgress(progress: number){
    this.uploadProgress = progress;
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

    if(currentEntry.id == 0)
      return accounts;

    let accountsToRemove = [];

    this.journalEntries.forEach(entry => {
      if(+entry.account.id != +currentEntry.account.id){
        accountsToRemove.push(entry.account.id);
      }
    });

    accountsToRemove.forEach(accountId => {
      accounts.splice(accounts.findIndex( a => a.id == accountId), 1);
    });

    //return accounts;
    return this.allAccounts.slice();
  }

  private validateForm(): string{
    if(!this.validateDebitCreditCount())
      return 'There must be at least one credit and one debit.';
    //Debit == Credit
    if(!this.validateDebitCreditEqual())
      return 'Debits and credits must be equal.';
    if(!this.validateAccountUse())
      return 'You cannot use one account more than once.';

    return null;
  }

  private validateDebitCreditCount(): boolean{
    let debit = 0;
    let credit = 0;

    this.journalEntries.forEach(entry => {
      if(entry.side == NormalSide.Left)
        debit++;
      else
        credit++;
    });

    return debit > 0 && credit > 0;
  }
  private validateAccountUse(): boolean{
    let accounts: number[] = [];
    let success = true;

    this.journalEntries.forEach(entry => {
      if(accounts.some(a => a == entry.account.id))
        success = false;
      accounts.push(entry.account.id);
    });

    return success;
  }
  private validateDebitCreditEqual(): boolean{
    let debit = 0;
    let credit = 0;

    this.journalEntries.forEach(entry => {
      if(entry.side == NormalSide.Left)
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
    if(!this.validateAccountUse())
      newErrors.push('You cannot use one account more than once.');

    this.journalEntriesErrors = newErrors;
  }

  async submit(){
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

    if(this.files.length > 0){
      transaction.attachments = await this.uploadFiles();
    }
    await this.journalService.addTransaction(transaction);
  }

  reset(){
    this.newForm.resetForm();

    this.journalEntriesTouched = false;
    this.journalEntriesErrors = [];

    this.files = [];
    this.uploadProgress = -1;

    this.journalEntries.splice(0, this.journalEntries.length);
    this.addNewEntry();
  }

}
