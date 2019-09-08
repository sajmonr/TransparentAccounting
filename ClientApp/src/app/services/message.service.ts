import {EventEmitter, Output} from "@angular/core";
import {Message, MessageType} from "../shared/message.model";

export class MessageService{
  @Output()messageReceived = new EventEmitter<Message>();

  info(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Info));
  }
  error(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Error));
  }
  success(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Success));
  }

  private constructMessage(title: string, message: string, type: MessageType): Message{
    const msg = new Message();

    msg.title = title;
    msg.message = message;
    msg.type = type;

    return msg;
  }

}
