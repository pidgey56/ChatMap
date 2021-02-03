import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { Conversation } from '../models/conversation.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  currentConversation: Conversation;
  conversations: Conversation[];
  conversationsSubject = new Subject<Conversation[]>();

  chatMessage: ChatMessage;
  chatMessages: ChatMessage[];
  chatMessagesSubject = new Subject<ChatMessage[]>();

  constructor(private authService: AuthService) { 
    this.getConversations(firebase.default.auth().currentUser.uid);
  }

  getConversations(uid: string) {
    var ref = firebase.default.database().ref("users/conversations/" + uid);
    ref.on('value', (data) => {
      this.conversations = data.val() ? data.val() : [];
      this.emitConversation();
    })
  }

  getMessages(idConv: string) {
    var ref = firebase.default.database().ref("messages/" + idConv);
    ref.orderByKey().on('value', (data) => {
      this.chatMessages = data.val() ? data.val() : [];
      this.emitMessages();
    })
  }

  emitMessages() {
    this.chatMessagesSubject.next(this.chatMessages);
  }

  emitConversation() {
    this.conversationsSubject.next(this.conversations);
  }

  generateId(): string {
    return "TODOO";
  }

  newConversation(uids?: string[], uid?: string) {
    let conversationUsers = [firebase.default.auth().currentUser.uid];
    if (uid != null) {
      conversationUsers.push(uid);
    }
    for (let ui of uids) {
      conversationUsers.push(ui);
    }
    let conversation = new Conversation(this.generateId(), conversationUsers);
    this.saveConversation(conversation);
  }

  saveConversation(conv: Conversation) {
    for (let userId of conv.users) {
      var ref = firebase.default.database().ref("users/conversations/" + userId).push();
      ref.set(conv.idConv);
    }
    var conversationRef = firebase.default.database().ref("conversations").push();
    conversationRef.set(conv);
  }

}
