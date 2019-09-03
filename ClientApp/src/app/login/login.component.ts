import {Component, NgModule, ViewChild} from "@angular/core";
import {LoginService} from "../services/login.service";
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

  constructor(private loginService: LoginService, private router: Router){}

  onSubmit(){
    this.loginService.logIn(this.loginForm.value.username, this.loginForm.value.password).subscribe((user: User) => {
      if(user){
        this.router.navigate(['/app/dashboard']);
      }else{
        this.invalidInfo = true;
      }
    })
  }
}
