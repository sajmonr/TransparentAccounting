import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "./api.service";
import {Account} from "../shared/account.model"
@Injectable()
export class AccountsService{
  constructor(private http: HttpClient, private api: ApiService){}

  getAccounts(): Promise<Account[]>{
    return new Promise<Account[]>(resolve => {
      this.http.get<Account[]>(this.api.getUrl(ApiMethod.GetAccounts)).subscribe(result => {
        if(result){
          resolve(result);
        }else{
          resolve([]);
        }
      })
    });
  }

}
