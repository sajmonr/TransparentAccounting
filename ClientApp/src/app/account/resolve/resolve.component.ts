import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-resolve',
  templateUrl: './resolve.component.html'
})
export class ResolveComponent{
  result: string;
  constructor(private httpClient: HttpClient){}


}
