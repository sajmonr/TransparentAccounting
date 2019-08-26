import {Component, OnInit} from "@angular/core";
import {User, UserRole} from "../../shared/user-model";
import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "../../api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  private users: User[] = [];
  private userToEdit: User;
  private editForm: FormGroup;

  constructor(private httpClient: HttpClient, private apiService: ApiService){}

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

    this.httpClient.post<User>(this.apiService.getUrl(ApiMethod.InsertUser), this.userToEdit).subscribe(() => {
      this.loadUsers();
      this.onFormClose();
    });
  }

  private onUserDelete(userId: number){
    this.httpClient.get(this.apiService.getUrl(ApiMethod.DeleteUserById) + '?userId=' + userId).subscribe(() => {
      this.loadUsers();
    })
  }

  private getRoleName(role: UserRole): string{
    switch(role){
      case UserRole.Administrator:
        return 'Administrator';
      case UserRole.Manager:
        return 'Manager';
      case UserRole.User:
        return 'User';
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
    //this.clearForm();
  }
  private clearForm(){
    this.editForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      fullName: new FormControl(null, Validators.required),
      role: new FormControl(2)
    });
  }
}
