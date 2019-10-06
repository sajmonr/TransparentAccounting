export class Message{
  title: string;
  modalMessage: string;
  type: MessageType;
}
export enum MessageType{Success, Error, Info}
