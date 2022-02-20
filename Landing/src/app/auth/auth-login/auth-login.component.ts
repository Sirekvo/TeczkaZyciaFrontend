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
              console.log(data);
              this.router.navigate(['/starter']);
              // this.getEmployees();
              form.reset();
          },
          (error: HttpErrorResponse) => {
              alert(error.message);
              form.reset();
          });
    }
}
