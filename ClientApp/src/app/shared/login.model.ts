import {User} from "./user-model";

export class Login{
  result: LoginResult;
  user: User;
}
export enum LoginResult{
  Success, InvalidPassword, UserSuspended, NotFound, LockedOut, PasswordExpired
}
