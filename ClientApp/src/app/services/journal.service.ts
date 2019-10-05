import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "./api.service";
import {JournalTransaction, TransactionStatusType} from "../shared/journal.transaction.model";
import {Injectable} from "@angular/core";
import {LoginService} from "./login.service";
import {Observable} from "rxjs";

@Injectable()
export class JournalService{
  constructor(private http: HttpClient, private api: ApiService, private login: LoginService){}

  addTransaction(transaction: JournalTransaction){
    this.http.post(this.api.getUrl(ApiMethod.AddTransaction), transaction).subscribe(result => {

    })
  }

  resolveTransaction(transaction: JournalTransaction, approve: boolean): Promise<any> {
    transaction.resolvedBy = this.login.getCurrentUser();

    return new Promise<any>(resolve => {
      this.http.post(this.api.getUrl(approve ? ApiMethod.ApproveTransaction : ApiMethod.RejectTransaction), transaction).subscribe(() => {
        resolve();
      });
    });
  }

}
