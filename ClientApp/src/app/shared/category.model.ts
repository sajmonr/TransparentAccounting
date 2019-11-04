export class Category{
  public id: number;
  public name: string;

  constructor() {
    this.id = 0;
  }
}
export enum CategoryType{
  Assets = 1,
  Liabilities,
  Revenues,
  Expenses,
  Equity
}
