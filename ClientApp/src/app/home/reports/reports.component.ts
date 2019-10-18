import {Component} from "@angular/core";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent{

  private onPrint(){
    window.print();
  }

  private onSave(){

  }
  private onEmail(){

  }
}
