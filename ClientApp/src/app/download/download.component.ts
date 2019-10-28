import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html'
})
export class DownloadComponent implements OnInit{
  private file: string;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.file = this.activatedRoute.params['file'];
    this.activatedRoute.params.subscribe(params => this.file = params['file']);
  }

}
