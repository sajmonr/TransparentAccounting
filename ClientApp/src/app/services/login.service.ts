import {User, UserRole} from "../shared/user-model";
import {HttpClient} from '@angular/common/http'
import {Inject, Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ApiMethod, ApiService} from "./api.service";

@Injectable()
export class LoginService{
  private userIdCookieName = 'userId';
  private currentUser: User;

  constructor(private httpClient: HttpClient,
              @Inject('BASE_URL') private baseUrl: string,
              private cookie: CookieService,
              private router: Router,
              private apiService: ApiService){

  }

  public logIn(username: string, password: string){
    let formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const s = this.httpClient.post(this.apiService.getUrl(ApiMethod.LogIn), formData);

    s.subscribe((user: User) => {
      if(user){
        this.currentUser = user;
        this.setUserCookie(user.id);
      }
    });

    return s;
  }

  public logOut(){
    this.currentUser = null;
    this.deleteUserCookie();
    this.router.navigate(['/login'])
  }

  public getCurrentUser(): User{
    return this.currentUser;
  }

  public currentUserRole(): UserRole{
    return this.currentUser ? this.currentUser.role : null;
  }

  public async isLoggedIn(): Promise<boolean>{
    // noinspection TypeScriptUnresolvedFunction
    return new Promise<boolean>((resolve) => {
      if(this.currentUser === undefined) {
        const cookie = this.getUserCookie();

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
    return this.httpClient.get<User>(this.apiService.getUrl(ApiMethod.UserById) + '?id=' + id.toString()).toPromise();
  }
  private deleteUserCookie(){
    this.cookie.delete(this.userIdCookieName);
  }
  private setUserCookie(id: number){
    this.cookie.set(this.userIdCookieName, id.toString(), undefined, '/');
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
