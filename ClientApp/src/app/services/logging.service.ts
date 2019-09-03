import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {Event} from "../shared/event.model";
import {ApiMethod, ApiService} from "./api.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggingService{
  constructor(private loginService: LoginService, private httpClient: HttpClient, private apiService: ApiService){}

  logEvent(description: string){
    const newEvent = new Event();

    newEvent.description = description;
    newEvent.timestamp = new Date();
    newEvent.createdBy = this.loginService.getCurrentUser();

    console.log(newEvent.timestamp);

    this.httpClient.post<Event>(this.apiService.getUrl(ApiMethod.CreateEvent), newEvent).subscribe();
  }

}
