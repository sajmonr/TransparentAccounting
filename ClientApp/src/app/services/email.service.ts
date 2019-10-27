import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "./api.service";
import {EmailMessage} from "../shared/email.message.model";

@Injectable()
export class EmailService{
  constructor(private http: HttpClient, private apiService: ApiService){}

  send(message: EmailMessage): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      this.http.post(this.apiService.getUrl(ApiMethod.SendEmail), message).subscribe(() => {
        resolve(true);
      });
    })
  }

}
