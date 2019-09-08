import {AfterViewInit, Component, OnInit} from "@angular/core";
import {MessageService} from "../services/message.service";
import {CookieService} from "ngx-cookie-service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit{
  private expiredPasswordNotificationCookieName = 'expired_notified';
  private passwordExpirationNotification = 3;

  constructor(private messageService: MessageService, private cookieService: CookieService, private loginService: LoginService){}

  ngAfterViewInit(): void {
    const passwordExpirationDate = new Date(this.loginService.getCurrentUser().passwordExpiration);
    if(passwordExpirationDate < this.getDateInFuture(this.passwordExpirationNotification)){
      const cookie = this.cookieService.get(this.expiredPasswordNotificationCookieName);
      if(!cookie){
        this.messageService.info('Password expiration', 'Your password will expire in less than three days.');
        this.cookieService.set(this.expiredPasswordNotificationCookieName, 'true');
      }
    }
  }

  private getDateInFuture(days: number): Date{
    return this.addDaysToDate(new Date(), days);
  }

  private addDaysToDate(date: Date, days: number): Date{
    let newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

}
