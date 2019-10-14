import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {Event} from "../shared/event.model";
import {ApiMethod, ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {T} from "@angular/core/src/render3";

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

  createLogEvent(description: string, original: string){
    const newEvent = new Event();

    newEvent.description = description;
    newEvent.timestamp = new Date();
    newEvent.createdBy = this.loginService.getCurrentUser();
    newEvent.original = original;

    console.log(newEvent.timestamp);

    this.httpClient.post<Event>(this.apiService.getUrl(ApiMethod.CreateEvent), newEvent).subscribe();
  }

  createLogEventFromObject<T>(description: string, object: T){
    const newEvent = new Event();

    newEvent.description = description;
    newEvent.timestamp = new Date();
    newEvent.createdBy = this.loginService.getCurrentUser();
    newEvent.original = object.toString();

    console.log(newEvent.timestamp);

    this.httpClient.post<Event>(this.apiService.getUrl(ApiMethod.CreateEvent), newEvent).subscribe();
  }

  updateLogEvent(description: string, original: string, updated: string){
    const newEvent = new Event();

    newEvent.description = description;
    newEvent.timestamp = new Date();
    newEvent.createdBy = this.loginService.getCurrentUser();
    newEvent.original = original;
    newEvent.updated = updated;

    console.log(newEvent.timestamp);

    this.httpClient.post<Event>(this.apiService.getUrl(ApiMethod.CreateEvent), newEvent).subscribe();
  }

  updateLogEventFromObject<T>(description: string, originalObject: T, updatedObject: T){
    const newEvent = new Event();

    newEvent.description = description;
    newEvent.timestamp = new Date();
    newEvent.createdBy = this.loginService.getCurrentUser();
    newEvent.original = originalObject.toString();
    newEvent.updated = updatedObject.toString();

    console.log(newEvent.timestamp);

    this.httpClient.post<Event>(this.apiService.getUrl(ApiMethod.CreateEvent), newEvent).subscribe();
  }

}
