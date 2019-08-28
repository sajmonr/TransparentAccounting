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
}
export enum NormalSide{
  LeftSide,
  RightSide
}
