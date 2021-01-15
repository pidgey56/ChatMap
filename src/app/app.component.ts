import { Component } from '@angular/core';
import * as firebase from "firebase";
import { environment } from "../environments/environment";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChatMap';
  ngOnInit(){
    firebase.default.initializeApp(environment.firebase)
  }

}
