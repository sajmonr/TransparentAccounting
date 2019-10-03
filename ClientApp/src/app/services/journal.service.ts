import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "./api.service";
import {JournalTransaction} from "../shared/journal.transaction.model";
import {Injectable} from "@angular/core";

@Injectable()
export class JournalService{
  constructor(private http: HttpClient, private api: ApiService){}

  addTransaction(transaction: JournalTransaction){
    console.log(transaction);
    this.http.post(this.api.getUrl(ApiMethod.AddTransaction), transaction).subscribe(result => {
      console.log('done');
    })
  }

}
