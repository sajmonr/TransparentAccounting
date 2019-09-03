import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {UserRole} from "../../shared/user-model";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private loginService: LoginService){}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private capitalizeFirstLetter(value: string){
    return value.charAt(0).toUpperCase() + value.slice(1);

  }

  private isUserAdmin(){
    return this.loginService.currentUserRole() == UserRole.Administrator;
  }

}
