import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../services/message.service";
import {ApiMethod, ApiService} from "../../services/api.service";

@Component({
  selector: 'app-resolve',
  templateUrl: './resolve.component.html'
})
export class ResolveComponent implements OnInit{
  result: string;
  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private apiService: ApiService){}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId'];
    const approve = this.route.snapshot.params['result'] == 1;

    this.httpClient.get(this.apiService.getUrl(ApiMethod.ResolveSelfRegistration) + '?userId=' + userId + '&approve=' + approve).subscribe(() => {
      this.messageService.success('User registration completed', 'The user has been ' + (approve ? 'approved' : 'denied') + '.');
      this.router.navigate(['/']);
    });

  }

}
