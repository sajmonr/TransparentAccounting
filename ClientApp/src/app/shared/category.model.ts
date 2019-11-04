export class Category{
  public id: number;
  public name: string;

  constructor() {
    this.id = 0;
  }
}
export enum CategoryType{
  Assets = 1,
  Liabilities = 2,
  Revenues = 3,
  Expenses = 4,
  Equity = 5
}
