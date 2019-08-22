import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AccountService} from './account.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private accountService: AccountService, private router: Router){ }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.accountService.isLoggedIn().then((loggedIn: boolean) => {
      if(loggedIn){
        return true;
      }else{
        this.router.navigate(['/login']);
      }
    })

  }

}
