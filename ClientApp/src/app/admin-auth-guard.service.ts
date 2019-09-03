import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "./services/login.service";
import {Observable} from "rxjs";
import {UserRole} from "./shared/user-model";
import {Injectable} from "@angular/core";

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(private loginService: LoginService, private router: Router){ }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.loginService.isLoggedIn().then((loggedIn: boolean) => {
      if(loggedIn && this.loginService.currentUserRole() == UserRole.Administrator){
        return true;
      }else{
        this.router.navigate(['/app']);
      }
    })

  }
}
