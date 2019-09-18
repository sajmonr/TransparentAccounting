import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Account} from "../../../shared/account.model";

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

  onAccountEdit(account: Account){
    this.accountSelected.emit(account);
  }

  onAccountRemove(account) {
    this.removeAccountSelected.emit(account.id);
  }

}
