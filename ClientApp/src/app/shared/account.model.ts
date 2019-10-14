import {Category} from "./category.model";
import {Subcategory} from "./subcategory.model";

export class Account{
  public id: number;
  public name: string;
  public normalSide: NormalSide;
  public beginningBalance: number;
  public balance: number;
  public debit: number;
  public credit: number;
  public comment: string;
  public category: Category;
  public subcategory: Subcategory;
  public order: number;
  public active: boolean;
  public accountId: number;

  public constructor(){
    this.id = 0;
    this.active = true;
    this.credit = 0;
    this.debit = 0;
    this.comment = "";
    this.name = "";
    this.normalSide = NormalSide.Left;
    this.beginningBalance = 0;
    this.balance = 0;
    this.category = new Category();
    this.subcategory = new Subcategory();
    this.accountId = 0;
  }

  public toString() {
    return "Id: " + this.id +
      " Active: " + this.active +
      " Credit: " + this.credit +
      " Debit: " + this.debit +
      " Name: " + this.name +
      " Normal Side: " + this.normalSide +
      " Beginning Balance: " + this.beginningBalance;
  }
}
export enum NormalSide{
  Left = 0,
  Right = 1
}
