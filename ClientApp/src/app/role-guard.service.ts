import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "./services/login.service";
import {Observable} from "rxjs";
import {UserRole} from "./shared/user-model";
import {Injectable} from "@angular/core";

@Injectable()
export class RoleGuard implements CanActivate{
  constructor(private loginService: LoginService){ }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.loginService.isLoggedIn().then((loggedIn: boolean) => {
      const currentUserRole = this.loginService.currentUserRole();

      return loggedIn && route.data.allowedRoles.some(role => role == currentUserRole);
    })
  }
}
