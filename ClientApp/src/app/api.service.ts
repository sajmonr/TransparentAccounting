import {Inject, Injectable} from "@angular/core";

@Injectable()
export class ApiService{

  constructor( @Inject('BASE_URL') private baseUrl: string){}

  getUrl(method: ApiMethod): string{
    let url = this.baseUrl + 'api/';

    switch(method){
      case ApiMethod.LogIn:
        url += 'Authenticate/LogIn';
        break;
      case ApiMethod.UserById:
        url += 'Users/GetUserById';
        break;
      case ApiMethod.GetAllUsers:
        url += 'Users/GetAllUsers';
        break;
      case ApiMethod.DeleteUserById:
        url += 'Users/DeleteUserById';
        break;
      case ApiMethod.InsertUser:
        url += 'Users/InsertUser';
        break;
    }

    return url;
  }

}

export enum ApiMethod {
  LogIn,
  UserById,
  GetAllUsers,
  DeleteUserById,
  InsertUser
}
