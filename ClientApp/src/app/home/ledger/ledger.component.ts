import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit{
  private accountId = 0;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(this.loadRouteParams.bind(this));
  }

  private loadRouteParams(params: Params){
    this.accountId = params['accountId'] ? params['accountId'] : 0;
  }
}
