import {Component, NgModule} from "@angular/core";
import {AccountService} from "../account.service";
import {User} from "../shared/user-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private accountService: AccountService, private router: Router){}

  onSubmit(){
    this.accountService.logIn('administrator', 'password').subscribe((user: User) => {
      if(user){
        this.router.navigate(['']);
      }
    })
  }

}
