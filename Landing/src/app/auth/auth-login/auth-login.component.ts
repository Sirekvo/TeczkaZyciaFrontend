import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenOutput} from "../../shared/models/user.model";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})

/**
 * Auth Login Component
 */
export class AuthLoginComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  checkUser(form: any) {
      this.userService.login(form.value.email, form.value.password).subscribe(
          (data: TokenOutput) => {
              console.log(data);
              // this.getEmployees();
              form.reset();
          },
          (error: HttpErrorResponse) => {
              alert(error.message);
              form.reset();
          });
  }
}
