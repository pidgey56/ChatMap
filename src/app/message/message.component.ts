import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { AuthService } from "../services/auth.service";
import { ChatMessage } from "../models/chat-message.model";
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail : string;
  userName : string;
  messageContent : string;
  timestamp : string;
  isOwnerMessage : boolean;

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage): void {
    this.messageContent = chatMessage.message;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
    this.timestamp = chatMessage.timeSent;
  }

}
