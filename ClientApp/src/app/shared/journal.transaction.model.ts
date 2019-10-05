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
