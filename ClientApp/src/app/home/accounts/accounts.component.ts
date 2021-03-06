import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../shared/category.model";
import {ApiMethod, ApiService} from "../../services/api.service";
import {Account, NormalSide} from "../../shared/account.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subcategory} from "../../shared/subcategory.model";
import {MessageService} from "../../services/message.service";
import {LoginService} from "../../services/login.service";
import {UserRole} from "../../shared/user-model";
import {LoggingService} from "../../services/logging.service";
import {EventType} from "../../shared/event.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit{
  private accounts: Account[] = [];
  private accountsCopy: Account[] = [];
  private categories: Category[];
  private modalTitle = 'Add Account';
  private editForm: FormGroup;
  private createForm: FormGroup;
  private selectedAccount: Account;
  private allCategories: Category[] = [];
  private allSubcategories: Subcategory[] = [];
  private static DEACTIVATE_ERROR_CODE = 1001;
  private static DEACTIVATE_SUCCESS_CODE = 1002;
  private static UNAUTHORIZED_ERROR_CODE = 1003;
  private static HELP_INFO_CODE = 1004;
  private static DUPLICATE_ACCOUNT_INFO_ERROR = 1005;
  private static ACTIVATE_SUCCESS_CODE = 1006;
  private static UPDATE_ACCOUNT_LOG = "Update Account";
  private static CREATE_ACCOUNT_LOG = "Create Account";
  private static DEACTIVATE_ACCOUNT_LOG = "Deactivate Account";
  private static ACTIVATE_ACCOUNT_LOG = "Activate Account";

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private messageService: MessageService,
              private loginService: LoginService,
              private loggingService: LoggingService){}

  ngOnInit(): void {
    this.getAccounts();
    this.http.get<Category[]>(this.apiService.getUrl(ApiMethod.GetCategories)).subscribe(categories => this.allCategories = categories);
    this.http.get<Subcategory[]>(this.apiService.getUrl(ApiMethod.GetSubcategories)).subscribe(subcategories => this.allSubcategories = subcategories);
    this.clearEditForm();
    this.clearCreateForm();
  }

  private getAccounts() {
    this.http.get<Account[]>(this.apiService.getUrl(ApiMethod.GetAccounts)).subscribe(accounts => this.afterAccountsFetch(accounts));
  }

  private onAccountSelected(account){
    if (!this.isUserAuthorized(true)) {
      return
    }
    (<any>$('#editAccountModal')).modal('show');
    this.populateEditAccountForm(account);
  }

  private onCreateAccountSelected(){
    if (!this.isUserAuthorized(true)) {
      return
    }
    this.clearCreateForm();
    this.populateCreateAccountForm(new Account());
    (<any>$('#createAccountModal')).modal('show');
  }


  private isUserAuthorized(shouldShowModal: boolean) {
    const role = this.loginService.currentUserRole();
    if (role == UserRole.Administrator || role == UserRole.Manager) {
      return true;
    } else {
      if (shouldShowModal) {
        this.createMessage(AccountsComponent.UNAUTHORIZED_ERROR_CODE);
      }
      return false;
    }
  }

  private onSearchInputEntered(searchInput) {
    let query = searchInput.target.value.toLowerCase();
    let accounts: Account[] = [];

    if (query.toString().length == 0) {
      this.accounts = this.accountsCopy;
      return;
    }

    for (let account of this.accountsCopy) {
      if (account.name.toLowerCase().search(query) != -1) {
        this.pushToArray(account, accounts);
      }
      if (account.accountId.toString().search(query) != -1) {
        this.pushToArray(account, accounts);
      }
      if (account.subcategory.name.toLowerCase().search(query) != -1) {
        this.pushToArray(account, accounts);
      }
      if (account.category.name.toLowerCase().search(query) != -1) {
        this.pushToArray(account, accounts);
      }
      if (account.accountId.toString().search(query) != -1) {
        this.pushToArray(account, accounts);
      }
      if (account.balance.toString().search(query) != -1) {
        this.pushToArray(account, accounts);
      }
    }

    this.accounts = accounts;
  }

  private pushToArray(account: Account, accounts: Account[]) {
    if (!AccountsComponent.isDuplicateInArray(account, accounts)) {
      accounts.push(account)
    }
  }

  private onActivateAccountSelected(account) {
    let clonedAccount = this.loggingService.cloneObject(account);
    this.selectedAccount = account;
    this.selectedAccount.active = true;
    this.loggingService.updateLogEventFromObject(AccountsComponent.ACTIVATE_ACCOUNT_LOG, clonedAccount, this.selectedAccount, EventType.Account);

    this.http.post(this.apiService.getUrl(ApiMethod.UpdateAccount), this.selectedAccount).subscribe(next => {
      this.selectedAccount = null;
      this.messageService.messageByCode(AccountsComponent.ACTIVATE_SUCCESS_CODE);
      this.getAccounts();
    });
  }

  private onDeactivateAccountSelected(account) {
    if (account.balance == 0) {
      let clonedAccount = this.loggingService.cloneObject(account);
      this.selectedAccount = account;
      this.selectedAccount.active = false;
      this.loggingService.updateLogEventFromObject(AccountsComponent.DEACTIVATE_ACCOUNT_LOG, clonedAccount, this.selectedAccount, EventType.Account);

      this.http.post(this.apiService.getUrl(ApiMethod.UpdateAccount), this.selectedAccount).subscribe(next => {
        this.selectedAccount = null;
        this.messageService.messageByCode(AccountsComponent.DEACTIVATE_SUCCESS_CODE);
        this.getAccounts();
      });
    } else {
      this.messageService.messageByCode(AccountsComponent.DEACTIVATE_ERROR_CODE);
    }
  }

  private getDistinctCategories(accounts: Account[]): Category[]{
    let categories = accounts.map(x => x.category);
    return categories.filter((value, index, self) => {
      return self.map(mapObj => mapObj['id']).indexOf(value['id']) === index;
    });
  }
  private getAccountsByCategory(categoryId: number): Account[]{
    return this.accounts.filter(function(account){
      return account.category.id === categoryId;
    });
  }

  private afterAccountsFetch(accounts: Account[]){
    this.accounts = accounts;
    this.accountsCopy = accounts;
    this.categories = this.getDistinctCategories(accounts);
  }

  private onEditAccountSubmit() {
    let clonedAccount = this.loggingService.cloneObject(this.selectedAccount);

    this.selectedAccount.accountId = this.editForm.value.id;
    this.selectedAccount.name = this.editForm.value.name;

    this.selectedAccount.subcategory = this.findSubcategoryById(this.editForm.value.subcategory);
    this.selectedAccount.category = this.findCategoryById(this.selectedAccount.subcategory.categoryId);
    if (this.selectedAccount.category.id == 1 || this.selectedAccount.category.id == 4) {
      this.selectedAccount.normalSide = this.editForm.value.contraAccount ? NormalSide.Right : NormalSide.Left;
    } else {
      this.selectedAccount.normalSide = this.editForm.value.contraAccount ? NormalSide.Left : NormalSide.Right;
    }
    this.selectedAccount.comment = this.editForm.value.comment;
    this.selectedAccount.contraAccount = this.editForm.value.contraAccount;

    this.loggingService.updateLogEventFromObject(AccountsComponent.UPDATE_ACCOUNT_LOG, clonedAccount, this.selectedAccount, EventType.Account);
    this.postEditAccount();
  }

  private onCreateAccountSubmit() {
    this.selectedAccount.accountId = this.createForm.value.id;
    this.selectedAccount.name = this.createForm.value.name;
    this.selectedAccount.beginningBalance = this.createForm.value.beginningBalance;
    this.selectedAccount.balance = this.selectedAccount.beginningBalance;

    this.selectedAccount.subcategory = this.findSubcategoryById(this.createForm.value.subcategory);
    this.selectedAccount.category = this.findCategoryById(this.selectedAccount.subcategory.categoryId);
    if (this.selectedAccount.category.id == 1 || this.selectedAccount.category.id == 4) {
      this.selectedAccount.normalSide = this.createForm.value.contraAccount ? NormalSide.Right : NormalSide.Left;
    } else {
      this.selectedAccount.normalSide = this.createForm.value.contraAccount ? NormalSide.Left : NormalSide.Right;
    }
    this.selectedAccount.comment = this.createForm.value.comment;
    this.selectedAccount.contraAccount = this.createForm.value.contraAccount;

    if (!this.isDuplicate(this.selectedAccount)) {
      this.loggingService.createLogEventFromObject(AccountsComponent.CREATE_ACCOUNT_LOG, this.selectedAccount, EventType.Account);

      this.postCreateAccount();
    } else {
      this.createMessage(AccountsComponent.DUPLICATE_ACCOUNT_INFO_ERROR);
    }
  }

  private postEditAccount() {
    this.http.post(this.apiService.getUrl(ApiMethod.UpdateAccount), this.selectedAccount).subscribe(next => {
      this.getAccounts();
      this.selectedAccount = null;
      this.closeEditAccountModal();
      this.clearEditForm();
    })
  }

  private postCreateAccount() {
    this.http.post(this.apiService.getUrl(ApiMethod.CreateAccount), this.selectedAccount).subscribe(next => {
      this.selectedAccount = null;
      this.closeCreateAccountModal();
      this.clearCreateForm();
      this.getAccounts();
    })
  }

  private clearEditForm(){
    this.editForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      comment: new FormControl(null),
      subcategory: new FormControl(null),
      contraAccount: new FormControl(null)
    });
  }

  private clearCreateForm(){
    this.createForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      beginningBalance: new FormControl(null, [Validators.required]),
      subcategory: new FormControl(null),
      comment: new FormControl(null),
      contraAccount: new FormControl(null)
    });
  }

  private populateEditAccountForm(account: Account) {
    this.clearEditForm();
    this.selectedAccount = account;
    this.editForm.patchValue( {
      id: this.selectedAccount.accountId,
      name: this.selectedAccount.name,
      subcategory: this.selectedAccount.subcategory.id,
      comment: this.selectedAccount.comment,
      contraAccount: this.selectedAccount.contraAccount
    });
  }

  private populateCreateAccountForm(account: Account) {
    this.clearCreateForm();
    this.selectedAccount = account;
    this.createForm.patchValue( {
      id: this.selectedAccount.accountId,
      name: this.selectedAccount.name,
      beginningBalance: this.selectedAccount.beginningBalance,
      subcategory: this.selectedAccount.subcategory.id,
      comment: this.selectedAccount.comment,
      contraAccount: this.selectedAccount.contraAccount
    });
  }

  private findCategoryById(id: number) {
    return this.allCategories.find(category => category.id === Number(id));
  }

  private findSubcategoryById(id: number) {
    return this.allSubcategories.find(subcategory => subcategory.id == id);
  }

  private closeEditAccountModal() {
    (<any>$('#editAccountModal')).modal('hide');
  }

  private closeCreateAccountModal() {
    (<any>$('#createAccountModal')).modal('hide');
  }

  private onRemoveAccount(id: number) {
    if (!this.isUserAuthorized(true)) {
      return
    }

    let success = false;
    for (let account of this.accounts) {
      if (account.accountId == id && account.balance != 0) {
        success = true;
        this.http.get(this.apiService.getUrl(ApiMethod.RemoveAccountById) + "?id=" + id).subscribe(next => {
          this.getAccounts();
        });
      }
    }
    if (!success) {
      this.messageService.messageByCode(AccountsComponent.DEACTIVATE_ERROR_CODE);
    }

  }

  private createMessage(code: number) {
    this.messageService.messageByCode(code);
  }

  private onHelpSelected() {
    this.createMessage(AccountsComponent.HELP_INFO_CODE);
  }

  private isDuplicate(newAccount: Account) {
    for (let account of this.accounts) {
      if (account.accountId == newAccount.accountId) {
        return true;
      }
      if (account.name.toLowerCase().match(newAccount.name.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  private showCalendar() {
    (<any>$('#calendar')).modal('show');
  }

  private showEmail() {
    (<any>$('#emailDialog')).modal('show');
  }

  private static isDuplicateInArray(newAccount: Account, accounts: Account[]) {
    for (let account of accounts) {
      if (account.accountId == newAccount.accountId) {
        return true;
      }
    }
    return false;
  }



}
