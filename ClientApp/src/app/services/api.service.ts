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
      case ApiMethod.DisableUserById:
        url += 'Users/DisableUserById';
        break;
      case ApiMethod.EnableUserById:
        url += 'Users/EnableUserById';
        break;
      case ApiMethod.InsertUser:
        url += 'Users/InsertUser';
        break;
      case ApiMethod.GetCategories:
        url += 'Accounts/GetCategories';
        break;
      case ApiMethod.GetSubcategories:
        url += 'Accounts/GetSubcategories';
        break;
      case ApiMethod.GetAccounts:
        url += 'Accounts/GetAccounts';
        break;
      case ApiMethod.GetAllEvents:
        url += 'Events/GetAll';
        break;
      case ApiMethod.CreateEvent:
        url += 'Events/Create';
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
  DisableUserById,
  EnableUserById,
  InsertUser,
  GetCategories,
  GetSubcategories,
  GetAccounts,
  GetAllEvents,
  CreateEvent
}
