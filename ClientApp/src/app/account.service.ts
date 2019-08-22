import {User} from "./shared/user-model";
import {HttpClient} from '@angular/common/http'
import {Inject, Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {current} from "codelyzer/util/syntaxKind";
import {C} from "@angular/core/src/render3";

@Injectable()
export class AccountService{
  private userIdCookieName = 'userId';
  private currentUser: User;

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string, private cookie: CookieService){

  }

  public logIn(username: string, password: string){
    let formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const s = this.httpClient.post(this.baseUrl + 'api/Authenticate/LogIn', formData);

    s.subscribe((user: User) => {
      if(user){
        this.currentUser = user;
        this.setUserCookie(user.id);
      }
    });

    return s;
  }

  public getCurrentUser() : User{
    return this.currentUser;
  }

  public async isLoggedIn(): Promise<boolean>{
    return new Promise<boolean>((resolve) => {
      if(this.currentUser === undefined) {
        const cookie = this.getUserCookie();

        console.log(cookie);

        if (cookie) {
          this.getUserById(cookie).then((result: User) => {
            if (result) {
              this.currentUser = result;
              resolve(true);
            } else {
              resolve(false);
            }
          })
        }else {
          resolve(false);
        }
        } else {
          resolve(true);
        }
    });
  }

  private getUserById(id: number) {
    return this.httpClient.get<User>(this.baseUrl + 'api/Authenticate/GetUserById?id=' + id.toString()).toPromise();
  }

  private setUserCookie(id: number){
    this.cookie.set(this.userIdCookieName, id.toString());
  }
  private getUserCookie(): number{
    const value = this.cookie.get(this.userIdCookieName);
    if(value == ''){
      return undefined;
    }else{
      return +value;
    }
  }
}
