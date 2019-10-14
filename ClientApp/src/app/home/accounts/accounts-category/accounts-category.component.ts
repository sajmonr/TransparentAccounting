import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Account, NormalSide} from "../../../shared/account.model";
import {LoginService} from "../../../services/login.service";
import {UserRole} from "../../../shared/user-model";

@Component({
  selector: 'app-accounts-category',
  templateUrl: './accounts-category.component.html',
  styleUrls: ['./accounts-category.component.css']
})
export class AccountsCategoryComponent{
  @Input() sectionTitle: string;
  @Input() accounts:Account[];
  @Output() accountSelected = new EventEmitter<Account>();
  @Output() removeAccountSelected = new EventEmitter<number>();
  @Output() deactivateAccountSelected = new EventEmitter<Account>();
  @Output() activateAccountSelected = new EventEmitter<Account>();

  constructor(private loginService: LoginService) {}

  private eNormalSide = NormalSide;

  onAccountEdit(account: Account){
    this.accountSelected.emit(account);
  }

  private accountsComparator(left: Account, right: Account): number{
    return left.order - right.order;
  }

  onAccountDeactivate(account) {
    this.deactivateAccountSelected.emit(account);
  }

  onAccountActivate(account) {
    this.activateAccountSelected.emit(account);
  }

  private isUserAuthorized() {
    const role = this.loginService.currentUserRole();
    return role == UserRole.Administrator;
  }



}
