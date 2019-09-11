import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {ApiMethod, ApiService} from "../../services/api.service";
import {PasswordValidator} from "../../shared/validators/password.validator";
import {User, UserUpdateResult} from "../../shared/user-model";
import {HttpClient} from "@angular/common/http";
import {SecurityQuestion} from "../../shared/security.question.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  private securityQuestions: SecurityQuestion[] = [];
  private registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    dateOfBirth: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, PasswordValidator.Length, PasswordValidator.Complexity]),
    securityQuestion: new FormControl(1, Validators.required),
    securityAnswer: new FormControl(null, [Validators.required]),
  });

  constructor(private messageService: MessageService,
              private apiService: ApiService,
              private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get(this.apiService.getUrl(ApiMethod.GetSecurityQuestions)).subscribe((questions: SecurityQuestion[]) => {
      this.securityQuestions = questions;
    })
  }

  private onRegister(){
    const user = new User();

    user.fullName = this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName;
    user.password = this.registerForm.value.password;
    user.email = this.registerForm.value.email;
    user.address = this.registerForm.value.address;
    user.dateOfBirth = new Date(this.registerForm.value.dateOfBirth);

    const securityQuestion = new SecurityQuestion();
    securityQuestion.id = this.registerForm.value.securityQuestion;
    securityQuestion.answer = this.registerForm.value.securityAnswer;
    user.securityQuestion = securityQuestion;

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
