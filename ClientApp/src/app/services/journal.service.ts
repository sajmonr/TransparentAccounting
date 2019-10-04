import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "./api.service";
import {JournalTransaction} from "../shared/journal.transaction.model";
import {Injectable} from "@angular/core";

@Injectable()
export class JournalService{
  constructor(private http: HttpClient, private api: ApiService){}

  addTransaction(transaction: JournalTransaction){
    this.http.post(this.api.getUrl(ApiMethod.AddTransaction), transaction).subscribe(result => {
      console.log('done');
    })
  }

  approveTransaction(transaction: JournalTransaction){
    this.http.post(this.api.getUrl(ApiMethod.ApproveTransaction), transaction);
  }

  rejectTransaction(transaction: JournalTransaction){
    this.http.post(this.api.getUrl(ApiMethod.RejectTransaction), transaction);
  }

}
