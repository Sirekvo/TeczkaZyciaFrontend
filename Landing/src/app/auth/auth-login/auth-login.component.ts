import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})

/**
 * Auth Login Component
 */
export class AuthLoginComponent implements OnInit {

  checking: Array<Login> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  checkUser(form: any) {
    const login = new Login();
    login.email = form.value.email;
    login.password = form.value.password;
    this.checking.push(login);
  }
}

class Login{
  email: string;
  password: string;
}