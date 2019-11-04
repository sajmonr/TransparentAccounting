export class EmailMessage{
  recipients: string[];
  message: string;
  subject: string;
  isHtml: boolean;
  attachments: string[];

  constructor(){
    this.recipients = [];
    this.attachments = [];
    this.isHtml = false;
  }

}
