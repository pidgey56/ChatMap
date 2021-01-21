import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from "firebase";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  islog : boolean = true;
  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(auth => {
      if(auth != null && auth != undefined){
        this.islog = true;
      }
      else{
        this.islog = false;
      }
    })
  }

  signOut(){
    this.authService.signOut();
  }

}
