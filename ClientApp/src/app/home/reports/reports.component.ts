import {Component, OnInit} from "@angular/core";
import {ReportsService} from "../../services/reports.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit{
  private fromFilter: Date;
  private toFilter: Date;

  constructor(private router: Router, private reportsService: ReportsService){
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd)
        this.navigationEnd();
    });
  }

  ngOnInit(): void {

  }

  private setDateFilter(value: Date, from: boolean){
    if(value){
      if(from)
        this.fromFilter = value;
      else
        this.toFilter = value;
    }

    this.reportsService.load(this.fromFilter, this.toFilter);
  }

  private navigationEnd(){
    this.fromFilter = null;
    this.toFilter = null;
    this.reportsService.load();
  }

  private onPrint(){
    window.print();
  }
  private onSave(){

  }
  private onEmail(){

  }
}
