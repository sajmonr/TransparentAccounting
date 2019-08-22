export class User{
  public constructor(public id: number, public username: string, public role: UserRole){
  }
}

enum UserRole{
  Administrator = 1,
  Manager = 2
}
