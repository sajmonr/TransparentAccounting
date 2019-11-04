import {Component, OnInit, ViewChild} from "@angular/core";
import {ReportsService} from "../../services/reports.service";
import {NavigationEnd, Router} from "@angular/router";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {UsersService} from "../../services/users.service";
import {User} from "../../shared/user-model";
import {NgForm} from "@angular/forms";
import {EmailMessage} from "../../shared/email.message.model";
import {FileService} from "../../services/file.service";
import {EmailService} from "../../services/email.service";
import {MessageService} from "../../services/message.service";

declare var $: any;

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

  @ViewChild('emailForm')emailForm: NgForm;
  private users: User[] = [];

  constructor(private router: Router,
              private reportsService: ReportsService,
              private usersService: UsersService,
              private fileService: FileService,
              private emailService: EmailService,
              private message: MessageService){
    this.yearFilter = new Date().getFullYear();

    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd)
        this.navigationEnd(e.url);
    });
    this.usersService.getUsers().then(users => this.users = users);
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

    if(url.endsWith('retained-earnings-statement')){
      this.filterType = DateSelectorType.Year;

      const years = this.getYearFromTo(new Date().getFullYear());
      this.fromFilter = years[0];
      this.toFilter = years[1];

    }else{
      this.filterType = DateSelectorType.To;
    }

    this.reportsService.load(this.fromFilter, this.toFilter);
  }
  private generatePdf(): Promise<jspdf>{
    const data = document.getElementById('pdf-save');

    return new Promise<jspdf>(resolve => {
      console.log(data);
      html2canvas(data).then(async canvas => {
        // Few necessary setting options
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        await pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        resolve(pdf);
      });
    });

  }

  private onPrint(){
    window.print();
  }
  private onSave(){
    this.generatePdf().then(pdf => {
      pdf.save('pdf-report.pdf'); // Generated PDF
    });
  }
  private onEmailSend(){
    this.generatePdf().then(pdf => {
      const file = new File([pdf.output('blob')], 'pdf-report.pdf');
      this.fileService.uploadFinished.subscribe(this.fileUploadFinished.bind(this));
      this.fileService.upload([file]);
    });
  }
  private fileUploadFinished(uploadedFiles: {name: string, path: string}[]){
    this.fileService.uploadFinished.unsubscribe();

    const email = new EmailMessage();

    email.recipients.push(this.emailForm.value.recipient.email);
    email.attachments.push(uploadedFiles[0].path);

    email.message = this.emailForm.value.message;

    email.subject = 'New report';

    this.emailService.send(email);
    this.message.success('Email sent', 'Your report was sent to the recipient.');
  }
}
export enum DateSelectorType{
  FromTo,
  To,
  Year
}
