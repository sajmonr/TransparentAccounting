import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "../../services/api.service";
import {User} from "../../shared/user-model";
import {Event} from "../../shared/event.model";
import {diffString} from "../events/stringdiff/jsdiff.js";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  private events: Event[];

  constructor(private httpClient: HttpClient, private apiService: ApiService){}

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(){
    this.httpClient.get(this.apiService.getUrl(ApiMethod.GetAllEvents)).subscribe((events: Event[]) => {
      this.events = events;
    })
  }

  private diffCheck(event: Event): string {
    return diffString("Hello my name is Myles", "Hello my name is Mike");
  }

}
