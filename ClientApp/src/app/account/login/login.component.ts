import {Component, ViewChild} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Login, LoginResult} from "../../shared/login.model";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  @ViewChild('loginForm') loginForm: NgForm;
  errorMessage: string;

  constructor(private loginService: LoginService, private router: Router){}

  onSubmit(){
    this.loginService.logIn(this.loginForm.value.username, this.loginForm.value.password).subscribe((login: Login) => {
      if(login.result == LoginResult.Success){
        this.router.navigate(['/app/dashboard']);
      }else{
        switch(login.result){
          case LoginResult.InvalidPassword:
            this.errorMessage = 'Username or password is invalid.';
            break;
          case LoginResult.UserSuspended:
            this.errorMessage = 'Your account is disabled.';
            break;
          case LoginResult.NotFound:
            this.errorMessage = 'User was not found.';
            break;
          case LoginResult.LockedOut:
            this.errorMessage = 'Too many failed attempts. The user was locked out.';
            break;
          case LoginResult.PasswordExpired:
            this.errorMessage = 'Your password has expired. Please reset it.';
            break;
        }
      }
    })
  }
}
