import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "./api.service";
import {JournalTransaction} from "../shared/journal.transaction.model";
import {Injectable} from "@angular/core";
import {LoginService} from "./login.service";
import {JournalEntry} from "../shared/journal.entry.model";

@Injectable()
export class JournalService{
  constructor(private http: HttpClient, private api: ApiService, private login: LoginService){}

  getEntries(): Promise<JournalEntry[]>{
    return new Promise<JournalEntry[]>(resolve => {
      this.http.get<JournalEntry[]>(this.api.getUrl(ApiMethod.GetJournalEntries)).subscribe(result => {
        resolve(result ? result : []);
      });
    });
  }

  async addTransaction(transaction: JournalTransaction): Promise<any>{
    return new Promise<any>(resolve => {
      this.http.post(this.api.getUrl(ApiMethod.AddTransaction), transaction).subscribe(result => {
        resolve();
      });
    });
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
