import {User} from "./user-model";
import {Journal} from "./journal.model";
import {JournalEntry} from "./journal.entry.model";
import {Attachement} from "./attachement.model";

export class JournalTransaction{
  id: number;
  createdBy: User;
  createDate: Date;
  description: string;
  resolvedBy: User;
  resolveDate: Date;
  journal: Journal;
  type: TransactionType;
  entries: JournalEntry[];
  status: TransactionStatusType;
  attachments: Attachement[];

  constructor(json?: JournalTransaction){
    if(json) {
      this.id = json.id;
      this.createdBy = json.createdBy;
      this.createDate = new Date(json.createDate);
      this.description = json.description;
      this.resolvedBy = json.resolvedBy;
      this.resolveDate = new Date(json.resolveDate);
      this.journal = json.journal;
      this.type = json.type;
      this.entries = json.entries;
      this.status = json.status;
      this.attachments = json.attachments;
    }
  }

}
export enum TransactionStatusType{
  Pending,
  Approved,
  Rejected
}
export enum TransactionType{
  Regular,
  Adjusting
}
