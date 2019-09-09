import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {ApiMethod, ApiService} from "../../services/api.service";
import {PasswordValidator} from "../../shared/validators/password.validator";
import {User, UserUpdateResult} from "../../shared/user-model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    dateOfBirth: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, PasswordValidator.Length, PasswordValidator.Complexity])
  });

  constructor(private messageService: MessageService,
              private apiService: ApiService,
              private httpClient: HttpClient){}

  private onRegister(){
    const user = new User();

    user.fullName = this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName;
    user.password = this.registerForm.value.password;
    user.email = this.registerForm.value.email;
    user.address = this.registerForm.value.address;

    this.httpClient.post(this.apiService.getUrl(ApiMethod.UserSelfRegister), user).subscribe((result: UserUpdateResult) => {
      if(result == UserUpdateResult.UsernameTaken){
        this.messageService.error('User cannot be created', 'This user is already registered.');
        return;
      }
      this.messageService.success('User registered', 'Waiting for activation. Please check your inbox for an email once your account has been activated.');
      this.registerForm.reset();
    });
  }

}
