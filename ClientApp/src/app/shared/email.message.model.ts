export class EmailMessage{
  recipients: string[];
  message: string;
  subject: string;
  html: boolean;

  constructor(){
    this.recipients = [];
    this.html = false;
  }

}
