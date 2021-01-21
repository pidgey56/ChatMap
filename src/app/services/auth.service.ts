import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  signUp(email: string, password: string, displayName: string) {
    return new Promise((resolve, reject) => {
      firebase.default
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
            this.creationUserInDb(email, displayName);
            this.setDisplayName(displayName);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logIn(email: string, password: string) {
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

  getCurrentUser() {
    return firebase.default.auth().currentUser;
  }

  getCurrentUserDisplayName() {
    return firebase.default.auth().currentUser.displayName;
  }

  getCurrentUserUid() {
    return firebase.default.auth().currentUser.uid;
  }

  islog(): boolean {
    if (this.getCurrentUser() == null || this.getCurrentUser() == undefined) {
      return false;
    }
    return true;
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
    this.router.navigate(['/']);
  }

  setDisplayName(displayName?: string) {
    firebase.default
      .auth()
      .currentUser.updateProfile({
        displayName: displayName,
      })
      .catch((error) => {
        console.log(error);
      });
  }

  creationUserInDb(email: string, displayName: string) {
    const uid = this.getCurrentUserUid();
    firebase.default
      .database()
      .ref('users/' + uid)
      .set({
        email: email,
        displayName: displayName,
      });
  }


}
