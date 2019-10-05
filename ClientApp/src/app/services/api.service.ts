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
      case ApiMethod.DisableUser:
        url += 'Users/Disable';
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
      case ApiMethod.GetAccountById:
        url += 'Accounts/GetAccountById';
        break;
      case ApiMethod.CreateAccount:
        url += 'Accounts/CreateAccount';
        break;
      case ApiMethod.UpdateAccount:
        url += 'Accounts/UpdateAccount';
        break;
      case ApiMethod.UpdateAccounts:
        url += 'Accounts/UpdateAccounts';
        break;
      case ApiMethod.RemoveAccountById:
        url += 'Accounts/RemoveAccountById';
        break;
      case ApiMethod.RemoveAccountsByIds:
        url += 'Accounts/RemoveAccountsByIds';
        break;
      case ApiMethod.GetAllEvents:
        url += 'Events/GetAll';
        break;
      case ApiMethod.CreateEvent:
        url += 'Events/Create';
        break;
      case ApiMethod.SendEmail:
        url += 'Email/Send';
        break;
      case ApiMethod.PasswordHistory:
        url += 'Users/PasswordHistory';
        break;
      case ApiMethod.UserSelfRegister:
        url += 'Users/SelfRegister';
        break;
      case ApiMethod.GetSecurityQuestions:
        url += 'Authenticate/SecurityQuestions';
        break;
      case ApiMethod.ForgotPassword:
        url += 'Users/ForgotPassword';
        break;
      case ApiMethod.ResolveSelfRegistration:
        url += 'Users/ResolveSelfRegistration';
        break;
      case ApiMethod.GetJournalEntries:
        url += 'Journal/Entries';
        break;
      case ApiMethod.GetTransactions:
        url += 'Journal/Transactions';
        break;
      case ApiMethod.AddTransaction:
        url += 'Journal/AddTransaction';
        break;
      case ApiMethod.ApproveTransaction:
        url += 'Journal/ApproveTransaction';
        break;
      case ApiMethod.RejectTransaction:
        url += 'Journal/RejectTransaction';
        break;
      case ApiMethod.UploadFile:
        url += 'Files/Upload';
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
  DisableUser,
  EnableUserById,
  InsertUser,
  GetCategories,
  GetSubcategories,
  GetAccounts,
  GetAccountById,
  CreateAccount,
  UpdateAccount,
  UpdateAccounts,
  RemoveAccountById,
  RemoveAccountsByIds,
  GetAllEvents,
  CreateEvent,
  SendEmail,
  PasswordHistory,
  UserSelfRegister,
  GetSecurityQuestions,
  ForgotPassword,
  ResolveSelfRegistration,
  GetJournalEntries,
  GetTransactions,
  AddTransaction,
  ApproveTransaction,
  RejectTransaction,
  UploadFile
}
