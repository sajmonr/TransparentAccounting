import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {UserRole} from "../../shared/user-model";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  private userRole = UserRole;
  isExpanded = false;

  constructor(private loginService: LoginService){}

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private capitalizeFirstLetter(value: string){
    return value.charAt(0).toUpperCase() + value.slice(1);

  }

  private roleCanActivate(roles: UserRole[]): boolean{
    return roles.some(role => role == this.loginService.currentUserRole());
  }

}
