export class User{
  id:number;
  username: string;
  role: UserRole;
  isActive: boolean;
  fullName: string;
  password: string;

  public constructor(){}
}

export enum UserRole{
  Administrator,
  Manager,
  Accountant
}
