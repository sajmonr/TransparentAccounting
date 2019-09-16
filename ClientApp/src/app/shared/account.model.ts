import {Category} from "./category.model";
import {Subcategory} from "./subcategory.model";

export class Account{
  public id: number;
  public name: string;
  public normalSide: NormalSide;
  public beginningBalance: number;
  public balance: number;
  public category: Category;
  public subcategory: Subcategory;
  public order: number;
  public active: boolean;

  public constructor(){
    this.id = 0;
    this.active = true;
    this.name = "";
    this.normalSide = NormalSide.LeftSide;
    this.beginningBalance = 0;
    this.balance = 0;
    this.category = new Category();
    this.subcategory = new Subcategory();
  }
}
export enum NormalSide{
  LeftSide,
  RightSide
}
