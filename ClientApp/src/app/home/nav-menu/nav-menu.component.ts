import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {UserRole} from "../../shared/user-model";
import {ReportType} from "../../shared/report-type.enum";
import {LoggingService} from "../../services/logging.service";
import {EventType} from "../../shared/event.model";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  private userRole = UserRole;
  private reportType = ReportType;
  isExpanded = false;

  constructor(private loginService: LoginService, private loggingService: LoggingService){}

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private capitalizeFirstLetter(value: string){
    return value.charAt(0).toUpperCase() + value.slice(1);

  }

  private roleCanActivate(roles: UserRole[]): boolean{
    return roles.some(role => role == this.loginService.currentUserRole());
  }

  private logout() {
    this.loggingService.logEvent("User: " + this.loginService.getCurrentUser().username + " logged out successfully", EventType.Login);
    this.loginService.logOut()
  }

}
