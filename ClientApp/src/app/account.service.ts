import {User} from "./shared/user-model";
import {HttpClient} from '@angular/common/http'
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AccountService{
  private currentUser: User;

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string){

  }

  public logIn(username: string, password: string){
    let formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const s = this.httpClient.post(this.baseUrl + 'api/Authenticate/LogIn', formData);

    s.subscribe((user: User) => {
      if(user){
        this.currentUser = user;
      }
    });
    return s;
  }

  public getCurrentUser() : User{
    return this.currentUser;
  }

  public isLoggedIn() : boolean{
    return this.currentUser != null;
  }

}
