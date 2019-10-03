import {User} from "./user-model";
import {Journal} from "./journal.model";
import {JournalEntry} from "./journal.entry.model";

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
}
export enum TransactionStatusType{
  Pending,
  Approved,
  Denied
}
export enum TransactionType{
  Regular,
  Adjusting
}
