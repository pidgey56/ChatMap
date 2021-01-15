import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  signUp(email: string, password: string, displayName: string) {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getCurrentUser(){
    return firebase.default.auth().currentUser;
  }

  signiN(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  signOut() {
    firebase.default.auth().signOut();
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = 'users/' + firebase.default.auth().currentUser.uid;
    const data = {
      email: email,
      displayName: displayName,
      status: status,
    };
    firebase.default
      .database()
      .ref(path)
      .update(data)
      .catch((error) => console.log(error));
  }
}
