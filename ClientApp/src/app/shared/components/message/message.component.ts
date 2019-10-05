import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Message, MessageType} from "../../message.model";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  private messageType = MessageType;
  private currentMessage: Message;
  @ViewChild('messageModal')messageModal: ElementRef;

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
    this.clearMessage();
    this.messageService.messageReceived.subscribe(message => this.onMessageReceived(message))
  }

  private onMessageReceived(message: Message){
    this.currentMessage = message;
    this.show();
  }

  private show(){
    //@ts-ignore
    $(this.messageModal.nativeElement).modal('show');
  }

  private hide(){
    //@ts-ignore
    $(this.messageModal.nativeElement).modal('hide');
  }

  private clearMessage(){
    this.currentMessage = new Message();
  }

}
