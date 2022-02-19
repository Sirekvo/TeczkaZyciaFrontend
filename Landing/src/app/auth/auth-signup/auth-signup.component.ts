import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})

/**
 * Auth Signup Component
 */
export class AuthSignupComponent implements OnInit {

  newUser: Array<SignUp>;

  constructor() {
  }

  ngOnInit(): void {
  }

  addNewUser(form: any) {
    const new_user = new SignUp();
    new_user.first_name = form.value.first_name;
    new_user.last_name = form.value.last_name;
    new_user.email = form.value.email;
    new_user.password = form.value.password;
    this.newUser.push(new_user);
  }
}

class SignUp{
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
