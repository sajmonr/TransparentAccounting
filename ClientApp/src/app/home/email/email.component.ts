import {Component, OnInit, ViewChild} from "@angular/core";
import {ApiMethod, ApiService} from "../../services/api.service";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {EmailMessage} from "../../shared/email.message.model";
import {User} from "../../shared/user-model";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit{
  @ViewChild('emailForm')emailForm: NgForm;
  private users: User[];

  constructor(private apiService: ApiService, private httpClient: HttpClient, private messageService: MessageService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  private onSendEmail(){
    const emailMessage = new EmailMessage();

    emailMessage.message = this.emailForm.value.message;
    emailMessage.subject = this.emailForm.value.subject;
    emailMessage.recipients = [this.emailForm.value.recipient];

    this.httpClient.post(this.apiService.getUrl(ApiMethod.SendEmail), emailMessage).subscribe(() => {
      this.messageService.success('Email sent', 'Email was successfully sent.');
    });
  }

  private loadUsers(){
    this.httpClient.get<User[]>(this.apiService.getUrl(ApiMethod.GetAllUsers)).subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
