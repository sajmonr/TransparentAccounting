import {Component, OnInit} from "@angular/core";
import {User, UserRole} from "../../shared/user-model";
import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "../../services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoggingService} from "../../services/logging.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  private users: User[] = [];
  private userToEdit: User;
  private editForm: FormGroup;

  constructor(private httpClient: HttpClient, private apiService: ApiService, private loggingService: LoggingService){}

  ngOnInit(): void {
    this.loadUsers();
    this.clearForm();
  }

  private onOpenEditForm(user: User){
    if(user){
      this.populateForm(user);
    }

    this.userToEdit = user ? user : new User();
  }

  onEditSubmit(){
    this.userToEdit.username = this.editForm.value.username;
    this.userToEdit.fullName = this.editForm.value.fullName;
    this.userToEdit.role = this.editForm.value.role;
    this.userToEdit.password = this.editForm.value.password;

    this.httpClient.post<User>(this.apiService.getUrl(ApiMethod.InsertUser), this.userToEdit).subscribe(() => {
      this.loadUsers();
      this.loggingService.logEvent('User with name "' + this.userToEdit.username + '" was added or modified.');
      this.onFormClose();
    });
  }

  private onUserDelete(userId: number){
    this.httpClient.get(this.apiService.getUrl(ApiMethod.DeleteUserById) + '?userId=' + userId).subscribe(() => {
      this.loadUsers();
    })
  }

  private onUserDisableToggle(userId: number, isActive: boolean){
    const method = isActive ? ApiMethod.DisableUserById : ApiMethod.EnableUserById;
    this.httpClient.get(this.apiService.getUrl(method) + '?userId=' + userId).subscribe(() => this.loadUsers());
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
  private populateForm(user: User){
    this.editForm.patchValue({
      fullName: user.fullName,
      username: user.username,
      role: user.role
    });
  }
  private loadUsers(){
    this.httpClient.get(this.apiService.getUrl(ApiMethod.GetAllUsers)).subscribe((users: User[]) => {
      this.users = users;
    })
  }
  private onFormClose(){
    this.userToEdit = null;
    this.clearForm();
  }
  private clearForm(){
    this.editForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      fullName: new FormControl(null, Validators.required),
      role: new FormControl(2),
      password: new FormControl(null, [this.passwordComplexity, this.passwordLength])
    });
  }

  //Validators
  private passwordComplexity(control: FormControl): {[s: string]: boolean}{
    //First check the length - if 0 then it is valid
    if(control.value === null || control.value.length === 0)
      return null;

    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumbers = /\d/.test(control.value);

    if (!(hasUpperCase && hasLowerCase && hasNumbers)){
      return {'passwordComplexity': true};
    }
    return null;
  }

  private passwordLength(control: FormControl): {[s: string]: boolean} {
    //Allow empty password to not change the password otherwise require minimum of 6 characters
    if(control.value !== null && control.value.length > 0 && control.value.length < 6)
      return {'passwordLength': true};

    return null;
  }

}
