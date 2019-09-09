import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordValidator} from "../../shared/validators/password.validator";
import {HttpClient} from "@angular/common/http";
import {SecurityQuestion} from "../../shared/security.question.model";
import {ApiMethod, ApiService} from "../../services/api.service";
import {User, UserUpdateResult} from "../../shared/user-model";
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit{
  private resetForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    securityQuestion: new FormControl(1, Validators.required),
    securityAnswer: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, PasswordValidator.Complexity, PasswordValidator.Length])
  });
  private securityQuestions: SecurityQuestion[] = [];

  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private messageService: MessageService,
              private router: Router){}

  ngOnInit(): void {
    this.httpClient.get(this.apiService.getUrl(ApiMethod.GetSecurityQuestions)).subscribe((questions: SecurityQuestion[]) => {
      this.securityQuestions = questions;
    })
  }

  private onPasswordSubmit(){
    const user = new User();
    user.securityQuestion = this.securityQuestions.filter(q => q.id === this.resetForm.value.securityQuestion)[0];

    user.username = this.resetForm.value.username;
    user.email = this.resetForm.value.email;
    user.securityQuestion.answer = this.resetForm.value.securityAnswer;
    user.password = this.resetForm.value.password;

    this.httpClient.post<UserUpdateResult>(this.apiService.getUrl(ApiMethod.ForgotPassword), user).subscribe((result: UserUpdateResult) => {
      let errorMessage: string;

      switch(result){
        case UserUpdateResult.UserNotFound:
          errorMessage = 'This user is not in the system.';
          break;
        case UserUpdateResult.WrongSecurityAnswer:
          errorMessage = 'Wrong answer to the security question or wrong security question selected.';
          break;
        case UserUpdateResult.PasswordUsedInPast:
          errorMessage = 'You have used this password in the past. Select a different one.';
          break;
      }

      if(errorMessage){
        this.messageService.error('Password reset error', errorMessage);
        return;
      }

      this.messageService.success('Password reset success', 'Your password was reset successfully. You can now log in.');
      this.router.navigate(['/account/login']);
    });
  }
}
