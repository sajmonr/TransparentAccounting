export class User{
  id:number;
  username: string;
  role: UserRole;
  isActive: boolean;
  fullName: string;
  password: string;
  email: string;
  suspendFrom: Date;
  suspendTo: Date;
  passwordExpiration: Date;
  address: string;

  public constructor(){
    this.isActive = true;
  }
}

export enum UserRole{
  Administrator,
  Manager,
  Accountant
}
export enum UserUpdateResult{
  Ok,
  PasswordUsedInPast,
  UsernameTaken
}
