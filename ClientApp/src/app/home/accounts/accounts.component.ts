import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../shared/category.model";
import {ApiMethod, ApiService} from "../../services/api.service";
import {Account} from "../../shared/account.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subcategory} from "../../shared/subcategory.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit{
  private accounts: Account[] = [];
  private categories: Category[];
  private modalTitle = 'Add Account';
  private editForm: FormGroup;
  private selectedAccount: Account;
  private allCategories: Category[] = [];
  private allSubcategories: Subcategory[] = [];

  constructor(private http: HttpClient, private apiService: ApiService){}

  ngOnInit(): void {
    this.getAccounts();
    this.http.get<Category[]>(this.apiService.getUrl(ApiMethod.GetCategories)).subscribe(categories => this.allCategories = categories);
    this.http.get<Subcategory[]>(this.apiService.getUrl(ApiMethod.GetSubcategories)).subscribe(subcategories => this.allSubcategories = subcategories);
    this.clearEditForm();
  }

  private getAccounts() {
    this.http.get<Account[]>(this.apiService.getUrl(ApiMethod.GetAccounts)).subscribe(accounts => this.afterAccountsFetch(accounts));
  }

  private onAccountSelected(account){
    console.log(account);
    (<any>$('#editAccountModal')).modal('show');
    this.populateEditAccountForm(account);
  }

  private onCreateAccountSelected(){
    this.clearEditForm();
    console.log();
    this.populateEditAccountForm( new Account());
    (<any>$('#editAccountModal')).modal('show');
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
    this.categories = this.getDistinctCategories(accounts);
  }

  private onEditAccountSubmit() {
    this.selectedAccount.name = this.editForm.value.name;
    this.selectedAccount.normalSide = this.editForm.value.normalSide;
    this.selectedAccount.beginningBalance = this.editForm.value.beginningBalance;
    this.selectedAccount.balance = this.editForm.value.balance;

    this.selectedAccount.category = this.findCategoryById(this.editForm.value.category);
    this.selectedAccount.subcategory = this.findSubcategoryById(this.editForm.value.subcategory);
    if (this.selectedAccount.id > 0) {
      this.postEditAccount();
    } else {
      this.postCreateAccount();
    }
  }

  private postEditAccount() {
    this.http.post(this.apiService.getUrl(ApiMethod.UpdateAccount), this.selectedAccount).subscribe(next => {
      this.selectedAccount = null;
      this.closeEditAccountModal();
      this.clearEditForm();
    })
  }

  private postCreateAccount() {
    this.http.post(this.apiService.getUrl(ApiMethod.CreateAccount), this.selectedAccount).subscribe(next => {
      this.selectedAccount = null;
      this.closeEditAccountModal();
      this.clearEditForm();
      this.getAccounts();
    })
  }

  private clearEditForm(){
    this.editForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      normalSide: new FormControl(null, Validators.required),
      beginningBalance: new FormControl(null, [Validators.required]),
      balance: new FormControl(null, Validators.required),
      category: new FormControl(null),
      subcategory: new FormControl(null),
    });
  }

  private populateEditAccountForm(account: Account) {
    this.selectedAccount = account;
    this.editForm.patchValue( {
      name: this.selectedAccount.name,
      normalSide: this.selectedAccount.normalSide,
      beginningBalance: this.selectedAccount.beginningBalance,
      balance: this.selectedAccount.balance,
      category: this.selectedAccount.category.id,
      subcategory: this.selectedAccount.subcategory.id
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

  private onRemoveAccount(id: number) {
    this.http.get(this.apiService.getUrl(ApiMethod.RemoveAccountById) + "?id=" + id).subscribe(next => {
      this.getAccounts();
    });
  }


}
