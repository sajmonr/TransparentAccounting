import {Component, NgModule, ViewChild} from "@angular/core";
import {AccountService} from "../account.service";
import {User} from "../shared/user-model";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  @ViewChild('loginForm') loginForm: NgForm;
  invalidInfo: boolean = false;

  constructor(private accountService: AccountService, private router: Router){}

  onSubmit(){
    this.accountService.logIn(this.loginForm.value.username, this.loginForm.value.password).subscribe((user: User) => {
      if(user){
        this.router.navigate(['']);
      }else{
        this.invalidInfo = true;
      }
    })
  }
}
