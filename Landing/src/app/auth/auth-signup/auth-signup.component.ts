import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {ChangeDetectorRef} from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})

/**
 * Auth Signup Component
 */
export class AuthSignupComponent implements OnInit {

    constructor(private userService: UserService){
    }

    ngOnInit(): void {
    }

    addNewUser(form: any) {
        this.userService.registerUser(form.value.firstName, form.value.lastName, form.value.email, form.value.password).subscribe(
            (response: any) => {
              console.log(response);

              // this.getEmployees();
              form.reset();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
              form.reset();
            }
        );

    }
}
