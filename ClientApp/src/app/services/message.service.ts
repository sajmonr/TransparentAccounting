import {EventEmitter, Injectable, Output} from "@angular/core";
import {Message, MessageType} from "../shared/message.model";
import {ApiMethod, ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MessageService{
  @Output()messageReceived = new EventEmitter<Message>();

  constructor(private httpClient: HttpClient,
              private apiService: ApiService){}

  info(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Info));
  }
  error(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Error));
  }
  success(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Success));
  }

  messageByCode(code: number){
    this.httpClient.get<Message>(this.apiService.getUrl(ApiMethod.MessageCode) + "?code=" + code).subscribe(message => {
      this.messageReceived.emit(message);
    })
  }

  private constructMessage(title: string, message: string, type: MessageType): Message {
    const msg = new Message();

    msg.title = title;
    msg.modalMessage = message;
    msg.type = type;

    return msg;
  }
}
