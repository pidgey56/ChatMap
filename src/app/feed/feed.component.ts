import { Component, OnChanges, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnChanges {
  feed: any;
  messagesSubscription: Subscription;

  constructor(private chat: ChatService) {
  }

  ngOnInit(): void {
    this.messagesSubscription = this.chat.chatMessagesSubject.subscribe(
      (messages: ChatMessage[]) => {
        this.feed = messages;
      }
    );
    this.chat.emitMessages();
  }

  ngOnChanges(): void {
    this.messagesSubscription = this.chat.chatMessagesSubject.subscribe(
      (messages: ChatMessage[]) => {
        this.feed = messages;
      }
    );
    this.chat.emitMessages();
  }
}
