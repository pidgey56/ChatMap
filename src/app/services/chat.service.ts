import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user: firebase.default.User;

  chatMessages: ChatMessage[];
  chatMessagesSubject = new Subject<ChatMessage[]>();
  chatMessage: ChatMessage;

  constructor() {
    firebase.default.auth().onAuthStateChanged((auth) => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
    this.getMessages();
  }

  emitMessages() {
    this.chatMessagesSubject.next(this.chatMessages);
  }

  getMessages() {
    var ref = firebase.default.database().ref('messages');
    ref
      .orderByKey()
      .on('value', (data) => {
        this.chatMessages = data.val() ? data.val() : [];
        this.emitMessages();
      });
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = 'test@test.com';
    const displayName = 'pseudoRandom';
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: displayName,
      email: email,
    });
    firebase.default.database().ref('messages').update(this.chatMessages);
  }

  getTimeStamp() {
    const now = new Date();
    const date =
      now.getUTCFullYear() +
      '/' +
      (now.getUTCMonth() + 1) +
      '/' +
      now.getUTCDate();
    const time =
      now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
    return date + ' ' + time;
  }
}
