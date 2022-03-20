import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import { NgForm, Validators } from '@angular/forms';
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

    information_to_user = '';
    isChecked : boolean;
    userEmail='';

    constructor(private userService: UserService){
    }

    ngOnInit(): void {
    }
    userEmails = new FormGroup({
        primaryEmail: new FormControl('',[
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });

    get email(){
        return this.userEmails.get('primaryEmail');
    }
    addNewUser(form: any) {
        if(form.value.firstName != ''){
            if(form.value.lastName != ''){
                if(form.value.email=''){
                    // if(form.value.password == form.value.repeat_password) {
                    //     if(this.isChecked == true){
                    //         console.log("zaznaczono");
                    //     }
                    //     else{
                    //         this.information_to_user="Nie zaakcpetowano regulaminu";
                    //         form.reset();
                    //     }
                    // }
                    // else{
                    //     this.information_to_user="Hasła są różne";
                    //     form.reset();
                    // }
                }
                else{
                    this.information_to_user="Nie podano emailu";
                    form.reset();
                }
            }
            else{
                this.information_to_user="Nie wypelniono wszystkich wymaganych pól";
                form.reset();
            }

        }
        else{
            this.information_to_user="Nie wypelniono wszystkich wymaganych pól";
            form.reset();
        }

        // this.userService.registerUser(form.value.firstName, form.value.lastName, form.value.email, form.value.password).subscribe(
        //     (response: any) => {
        //       console.log(response);
        //
        //       // this.getEmployees();
        //       form.reset();
        //     },
        //     (error: HttpErrorResponse) => {
        //       alert(error.message);
        //       form.reset();
        //     }
        // );

    }
}
