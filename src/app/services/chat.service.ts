import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  user: firebase.default.User;
  /*users: User[];
  usersSubject = new Subject<User[]>();*/

  chatMessage: ChatMessage;
  chatMessages: ChatMessage[];
  chatMessagesSubject = new Subject<ChatMessage[]>();

  conversation: Conversation;
  conversations : Conversation[];
  conversationsSubject = new Subject<Conversation[]>();


  constructor(private authService: AuthService) {
    firebase.default.auth().onAuthStateChanged((auth) => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
    this.user = this.authService.getCurrentUser();
    
    this.getMessages();
    //this.getUsers();

  }

  emitMessages() {
    this.chatMessagesSubject.next(this.chatMessages);
  }

  emitConversation(){
    this.conversationsSubject.next(this.conversations);
  }

  /*emitUsers() {
    this.usersSubject.next(this.users);
  }*/

  
  getMessages() {
    var ref = firebase.default.database().ref('messages');
    ref.orderByKey().on('value', (data) => {
      this.chatMessages = data.val() ? data.val() : [];
      this.emitMessages();
    });
  }

  getConversations(){
    var ref = firebase.default.database().ref('conversations/'+this.user.uid);
    ref.on('value', (data) => {
      this.conversation = data.val() ? data.val() : [];
      this.emitConversation();
    })
  }

  generateId(){
    return "random phrase";
  }

  /*getUsers() {
    var ref = firebase.default.database().ref('/users');
    ref.orderByKey().on('value', (data) => {
      this.users = Object.values(data.val()) ? data.val() : [];
      this.emitUsers();
    });
  }*/

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    const displayName = this.user.displayName;
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      displayName: displayName,
      email: email,
    });
    firebase.default.database().ref('messages').set(this.chatMessages);
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
