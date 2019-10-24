import {Component, OnInit} from "@angular/core";
import {ReportsService} from "../../services/reports.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent{
  private dateSelectorType = DateSelectorType;
  private filterType = DateSelectorType.FromTo;
  private fromFilter: Date;
  private toFilter: Date;
  private yearFilter: number;

  constructor(private router: Router, private reportsService: ReportsService){
    this.yearFilter = new Date().getFullYear();

    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd)
        this.navigationEnd(e.url);
    });
  }

  private setDateFilter(value: Date, from: boolean){
    if(from)
      this.fromFilter = value;
    else
      this.toFilter = value;

    this.reportsService.load(this.fromFilter, this.toFilter);
  }

  private setYearFilter(value: number){
    const years = this.getYearFromTo(value);
    this.fromFilter = years[0];
    this.toFilter = years[1];

    this.reportsService.load(this.fromFilter, this.toFilter);
  }

  private getYearFromTo(year: number): Date[]{
    return [
      new Date(year, 0, 1),
      new Date(year, 11, 31, 23, 59, 59, 999)
    ];
  }

  private navigationEnd(url: string){
    this.fromFilter = null;
    this.toFilter = null;

    if(url.endsWith('balance-sheet')){
      this.filterType = DateSelectorType.To;
    }else if(url.endsWith('retained-earnings-statement')){
      this.filterType = DateSelectorType.Year;

      const years = this.getYearFromTo(new Date().getFullYear());
      this.fromFilter = years[0];
      this.toFilter = years[1];

    }else{
      this.filterType = DateSelectorType.FromTo;
    }

    this.reportsService.load(this.fromFilter, this.toFilter);
  }

  private onPrint(){
    window.print();
  }
  private onSave(){

  }
  private onEmail(){

  }
}
export enum DateSelectorType{
  FromTo,
  To,
  Year
}
