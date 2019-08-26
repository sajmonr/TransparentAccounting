import { Component } from '@angular/core';
import {AccountService} from "../../account.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private accountService: AccountService){}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private capitalizeFirstLetter(value: string){
    return value.charAt(0).toUpperCase() + value.slice(1);

  }

}
