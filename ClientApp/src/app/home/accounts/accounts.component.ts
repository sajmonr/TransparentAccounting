import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../shared/category.model";
import {ApiMethod, ApiService} from "../../services/api.service";
import {Account} from "../../shared/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  private accounts: Account[] = [];
  private categories: Category[];

  constructor(private http: HttpClient, private apiService: ApiService){}

  ngOnInit(): void {
    this.http.get<Account[]>(this.apiService.getUrl(ApiMethod.GetAccounts)).subscribe(accounts => this.afterAccountsFetch(accounts));
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

}
