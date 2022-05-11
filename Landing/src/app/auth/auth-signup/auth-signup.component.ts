import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import { NgForm, Validators } from '@angular/forms';
import {ChangeDetectorRef} from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {PatientService} from "../../shared/services/patient.service";
import {MustMatch} from "../../shared/match_validator/must_match.validator";
import {state} from "@angular/animations";



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
    web = true;

    registerForm: FormGroup;
    submitted = false;

    constructor(private userService: UserService,
                private patientService: PatientService,
                private router: Router,
                private formBuilder: FormBuilder){
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            pesel: new FormControl('', Validators.pattern("^[0-9]{11}$")), // 11 letters
            email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]), // has @abc.abc
            password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$")]), // min 8 chracters and max 16 with min 1 capital letter, 1 digit and 1 special character
            confirmPassword: new FormControl('', [Validators.required]),
            rules: new FormControl(false,[Validators.requiredTrue]),
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
        if (window.innerWidth <= 768) { // 768px portrait
            this.web = false;
        }
    }
    get f() { return this.registerForm.controls; }

    addNewUser(form: any) {
        this.submitted = true;


        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        else{
            this.patientService.existsEmail(form.value.email).subscribe(
            (data: any) => {
                if (data.exists == false) {
                    this.userService.registerUser(form.value.firstName, form.value.lastName, form.value.pesel, form.value.email, form.value.password).subscribe(
                        (response: any) => {
                            this.router.navigate(['/confirm-mail'], {queryParams: { name: form.value.firstName, email: form.value.email}});
                        },
                        (error: HttpErrorResponse) => {
                            form.reset();
                        }
                    );
                }
                else {
                    this.information_to_user = 'Podany adres e-mail jest już zajęty';
                }
            },
            () => {
            }
        );
        }
    }
}
