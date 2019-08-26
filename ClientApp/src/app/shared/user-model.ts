export class User{
  id:number;
  username: string;
  role: UserRole;
  isActive: boolean;
  fullName: string;

  public constructor(){}
}

export enum UserRole{
  Administrator,
  Manager,
  User
}
