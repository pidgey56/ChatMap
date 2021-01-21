import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  email : string;
  password : string;
  errorMsg : string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  logIn(){
      const email = this.email;
      const password = this.password;
      this.authService
        .logIn(email, password)
        .then((resolve) => this.router.navigate(['/']))
        .catch((error) => (this.errorMsg = error));
    
  }

}
