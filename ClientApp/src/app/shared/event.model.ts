import {User} from "./user-model";

export class Event{
  id: number;
  createdBy: User;
  timestamp: Date;
  description: string;
  original: string;
  updated: string;
}
