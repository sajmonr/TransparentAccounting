import {Component, OnInit} from "@angular/core";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {JournalEntry} from "../../shared/journal.entry.model";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit{
  constructor(private apiService: ApiService, private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<JournalEntry>(this.apiService.getUrl(ApiMethod.GetJournalEntries)).subscribe(entry => {
      console.log(entry);
    })
  }

}
