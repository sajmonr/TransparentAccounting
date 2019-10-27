import  {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {Event, EventType} from "../shared/event.model";
import {ApiMethod, ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {T} from "@angular/core/src/render3";

@Injectable()
export class LoggingService{
  constructor(private loginService: LoginService, private httpClient: HttpClient, private apiService: ApiService){}

  logEvent(description: string, eventType: EventType){
    const newEvent = new Event();

    newEvent.description = description;
    newEvent.timestamp = new Date();
    newEvent.createdBy = this.loginService.getCurrentUser();
    newEvent.eventType = eventType;

    console.log(newEvent.timestamp);

    this.httpClient.post<Event>(this.apiService.getUrl(ApiMethod.CreateEvent), newEvent).subscribe();
  }

  createLogEventFromObject<T>(description: string, object: T, eventType: EventType){
    const newEvent = new Event();

    newEvent.description = description;
    newEvent.timestamp = new Date();
    newEvent.createdBy = this.loginService.getCurrentUser();
    newEvent.original = JSON.stringify(object);
    newEvent.eventType = eventType;

    console.log(newEvent.timestamp);

    this.httpClient.post<Event>(this.apiService.getUrl(ApiMethod.CreateEvent), newEvent).subscribe();
  }

  updateLogEventFromObject<T>(description: string, originalObject: T, updatedObject: T, eventType: EventType){
    const newEvent = new Event();

    newEvent.description = description;
    newEvent.timestamp = new Date();
    newEvent.createdBy = this.loginService.getCurrentUser();
    newEvent.original = JSON.stringify(originalObject);
    newEvent.updated = JSON.stringify(updatedObject);
    newEvent.eventType = eventType;

    console.log(newEvent.timestamp);

    this.httpClient.post<Event>(this.apiService.getUrl(ApiMethod.CreateEvent), newEvent).subscribe();
  }

  retrieveLoggedObject<T>(object: string): T {
    return JSON.parse(object);
  }

  cloneObject<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  }

}
