import {Component, OnInit} from "@angular/core";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {JournalEntry} from "../../shared/journal.entry.model";
import {JournalTransaction} from "../../shared/journal.transaction.model";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit{
  constructor(private apiService: ApiService, private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<JournalTransaction>(this.apiService.getUrl(ApiMethod.GetTransactions)).subscribe(transaction => {
      console.log(transaction);
    });
  }

}
