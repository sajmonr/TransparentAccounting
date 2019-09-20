import {User} from "./user-model";
import {Journal} from "./journal.model";
import {JournalEntryType} from "./journal.entry.type.model";
import {JournalEntry} from "./journal.entry.model";

export class JournalTransaction{
  id: number;
  createdBy: User;
  createDate: Date;
  description: string;
  approvedBy: User;
  approveDate: Date;
  journal: Journal;
  type: JournalEntryType;
  entries: JournalEntry[];
}
