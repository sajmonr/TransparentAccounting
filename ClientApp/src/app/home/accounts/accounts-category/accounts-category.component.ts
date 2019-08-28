import {Component, Input} from "@angular/core";
import {Account} from "../../../shared/account.model";

@Component({
  selector: 'app-accounts-category',
  templateUrl: './accounts-category.component.html',
  styleUrls: ['./accounts-category.component.css']
})
export class AccountsCategoryComponent{
  @Input() sectionTitle: string;
  @Input() accounts:Account[];
}
