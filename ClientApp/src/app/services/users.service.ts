import {Injectable} from "@angular/core";
import {User} from "../shared/user-model";
import {ApiMethod, ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UsersService{

  constructor(private http: HttpClient, private apiService: ApiService){}

  getUsers(onlyExpired?: boolean): Promise<User[]>{
    return new Promise<User[]>(resolve => {
      this.http.get<User[]>(this.apiService.getUrl(ApiMethod.GetAllUsers)).subscribe((users: User[]) => {
        if(onlyExpired){
          const expiredUsers: User[] = [];

          users.forEach(user => {
            if(this.isPasswordExpired(user)){
              expiredUsers.push(user);
            }

            users = expiredUsers;
          });
        }

        resolve(users);
      })
    });
  }

  private isPasswordExpired(user: User): boolean{
    return new Date(user.passwordExpiration) < new Date();
  }

}
