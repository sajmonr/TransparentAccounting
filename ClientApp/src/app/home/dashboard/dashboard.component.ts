import {Component} from "@angular/core";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {EmailMessage} from "../../shared/email.message.model";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent{
  constructor(private apiService: ApiService, private httpClient: HttpClient, private messageService: MessageService){}

  onSendEmail(){
    let message = new EmailMessage();

    this.httpClient.post<EmailMessage>(this.apiService.getUrl(ApiMethod.SendEmail), message).subscribe((response) => {
      console.log('done');
    })
  }
}
