import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenOutput} from "../../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})

/**
 * Auth Login Component
 */
export class AuthLoginComponent implements OnInit {

    information_to_user = '';
    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void {
    }
    //     activatedRoute.queryParams.subscribe(params => {
    //     this.redirectUrl = params['redirectUrl'];
    // });
    checkUser(form: any) {

      this.userService.login(form.value.email, form.value.password).subscribe(
          (data: TokenOutput) => {
              console.log(data.token);
              this.userService.setLocalUser(data, form.value.remember === true);

              if(data.firstLogin == true){
                  this.router.navigate(['/starter']);
              }
              else if(data.firstLogin == false){
                  this.router.navigate(['/main']);
              }
              else{
                  this.information_to_user = 'Niepoprawny email lub hasło';
                  form.reset();
              }

          },
          () => {

          });
    }
}
