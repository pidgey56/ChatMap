import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[];
  usersSubscription: Subscription;

  constructor(private chat: ChatService) {}

  ngOnInit(): void {
    /*this.usersSubscription = this.chat.usersSubject.subscribe(
      (users: any[]) => {
        this.users = Object.values(users);
      }
    );
    this.chat.emitUsers();*/

    var ref = firebase.default.database().ref('users');
    ref.on('value', (data) => {
      this.users = data.val() ? data.val() : [];
      this.users = Object.values(this.users);
      this.chat.emitMessages();
    });
  }

  ngOnChanges(): void {
    var ref = firebase.default.database().ref('users');
    ref.on('value', (data) => {
      this.users = data.val() ? data.val() : [];
      this.users = Object.values(this.users);
      this.chat.emitMessages();
    });
  }
}
