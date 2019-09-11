import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {User, UserRole, UserUpdateResult} from "../../shared/user-model";
import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "../../services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordValidator} from "../../shared/validators/password.validator";
import {DatePipe} from "@angular/common";
import {MessageService} from "../../services/message.service";
import {PasswordHistory} from "../../shared/password.history.model";
import {SecurityQuestion} from "../../shared/security.question.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  @ViewChild('editUserModal')editUserModal: ElementRef;
  @ViewChild('disableUserModal')disableUserModal: ElementRef;
  private dateFormatter = new DatePipe('en-US');
  private users: User[] = [];
  private selectedUser = new User();
  private editForm: FormGroup;
  private disableForm: FormGroup;
  private securityQuestions: SecurityQuestion[] = [];


  constructor(private httpClient: HttpClient,
              private apiService: ApiService,
              private messageService: MessageService){}

  ngOnInit(): void {
    this.httpClient.get(this.apiService.getUrl(ApiMethod.GetSecurityQuestions)).subscribe((questions: SecurityQuestion[]) => {
      this.securityQuestions = questions;
    });

    this.loadUsers();
    this.clearForms();
  }

  private onEditUser(user: User){
    this.selectedUser = user ? user : new User();
    this.populateEditForm(this.selectedUser);
  }
  private onDisableUser(user: User){
    this.selectedUser = user;
    this.populateDisableForm(user);
  }
  onEditSubmit(){
    this.selectedUser.username = this.editForm.value.username;
    this.selectedUser.fullName = this.editForm.value.fullName;
    this.selectedUser.role = this.editForm.value.role;
    this.selectedUser.password = this.editForm.value.password;
    this.selectedUser.email = this.editForm.value.email;
    this.selectedUser.address = this.editForm.value.address;
    this.selectedUser.dateOfBirth = new Date(this.editForm.value.dateOfBirth);

    const securityQuestion = new SecurityQuestion();
    securityQuestion.id = this.editForm.value.securityQuestion;
    securityQuestion.answer = this.editForm.value.securityAnswer;
    this.selectedUser.securityQuestion = securityQuestion;

    this.httpClient.post(this.apiService.getUrl(ApiMethod.InsertUser), this.selectedUser).subscribe((result: UserUpdateResult) => {
      if(result == UserUpdateResult.PasswordUsedInPast){
        this.messageService.error('User cannot be saved','The password you have specified has been used for this user before. Please use a different password.');
        return;
      }else if(result == UserUpdateResult.UsernameTaken){
        this.messageService.error('User cannot be saved', 'The username you have specified is taken. Please use a different username.');
        return;
      }
      this.selectedUser = new User();
      this.loadUsers();
      this.closeEditForm();
    });
  }
  private onViewChange(value){
    this.loadUsers(value == 1);
  }
  onDisableSubmit(){
    if(this.disableForm.value.disabledIndefinitely){
      this.selectedUser.isActive = this.disableForm.value.disabledIndefinitely;
    }else{
      const fromDate = new Date(this.disableForm.value.disabledFrom);
      const toDate = new Date(this.disableForm.value.disabledTo);

      this.selectedUser.suspendFrom = fromDate;
      this.selectedUser.suspendTo = toDate;
    }

    this.httpClient.post<User>(this.apiService.getUrl(ApiMethod.DisableUser), this.selectedUser).subscribe(() => {
      this.loadUsers();
      this.closeDisableForm();
    });
  }

  private onDeleteUser(){
    this.httpClient.get(this.apiService.getUrl(ApiMethod.DeleteUserById) + '?userId=' + this.selectedUser.id).subscribe(() => {
      this.closeDisableForm();
      this.loadUsers();
    })
  }

  private getRoleName(role: UserRole): string{
    switch(role){
      case UserRole.Administrator:
        return 'Administrator';
      case UserRole.Manager:
        return 'Manager';
      case UserRole.Accountant:
        return 'Accountant';
    }
  }
  private populateEditForm(user: User){

    this.editForm.patchValue({
      fullName: user.fullName,
      username: user.username,
      role: user.role,
      email: user.email,
      address: user.address,
      securityQuestion: user.securityQuestion.id,
      securityAnswer: user.securityQuestion.answer,
      dateOfBirth: this.formatDate(user.dateOfBirth)
    });
  }
  private populateDisableForm(user: User){
    this.disableForm.patchValue({
      disabledFrom: this.formatDate(user.suspendFrom),
      disabledTo: this.formatDate(user.suspendTo),
      disabledIndefinitely: !user.isActive
    });
  }
  private loadUsers(onlyExpired?: boolean){
    this.httpClient.get<User[]>(this.apiService.getUrl(ApiMethod.GetAllUsers)).subscribe((users: User[]) => {
      if(onlyExpired){
        this.users = [];

        users.forEach(user => {
          if(this.isPasswordExpired(user)){
            this.users.push(user);
          }
        });

      }else{
        this.users = users;
      }
    })
  }
  private formatDate(date: Date, format?: string){
    if(!format){
      format = 'yyyy-MM-dd';
    }
    return this.dateFormatter.transform(date, format);
  }
  private closeEditForm(){
    //@ts-ignore
    $(this.editUserModal.nativeElement).modal('hide');
    this.selectedUser = null;
    this.clearEditForm();
  }

  private closeDisableForm(){
    //@ts-ignore
    $(this.disableUserModal.nativeElement).modal('hide');
    this.selectedUser = null;
    this.clearDisableForm();
  }
  private clearForms(){
    this.clearDisableForm();
    this.clearEditForm();
  }

  private clearEditForm(){
    this.editForm = new FormGroup({
      username: new FormControl(null),
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, Validators.required),
      role: new FormControl(2),
      password: new FormControl(null, [PasswordValidator.Length, PasswordValidator.Complexity]),
      securityQuestion: new FormControl(1, Validators.required),
      securityAnswer: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, Validators.required)
    });
  }
  private clearDisableForm(){
    this.disableForm = new FormGroup({
      disabledFrom: new FormControl(null),
      disabledTo: new FormControl(null),
      disabledIndefinitely: new FormControl(false)
    });
  }
  private isPasswordExpired(user: User): boolean{
    return new Date(user.passwordExpiration) < new Date();
  }
}
