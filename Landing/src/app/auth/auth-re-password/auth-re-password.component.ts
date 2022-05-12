import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {NgForm, Validators} from '@angular/forms';
import {PatientService} from "../../shared/services/patient.service";
import {UserService} from "../../shared/services/user.service";

@Component({
    selector: 'app-auth-re-password',
    templateUrl: './auth-re-password.component.html',
    styleUrls: ['./auth-re-password.component.css']
})

/**
 * Auth RePassword Component
 */
export class AuthRePasswordComponent implements OnInit {
    rePasswordForm: FormGroup;
    submitted = false;
    information_to_user = '';
    showSuccessEmail = false;

    constructor(private formBuilder: FormBuilder,
                private patientService: PatientService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.rePasswordForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        }, {});
    }

    get f() {
        return this.rePasswordForm.controls;
    }

    forgotPassword(form: any) {
        this.submitted = true;


        // stop here if form is invalid
        if (this.rePasswordForm.invalid) {
            return;
        } else {
            this.patientService.existsEmail(form.value.email).subscribe(
                (data: any) => {
                    if (data.exists == true) {
                        this.userService.forgotPassword(form.value.email).subscribe(
                            (data: any) => {
                                form.reset();
                                this.submitted = false;
                                this.information_to_user = '';
                                this.showSuccessEmail = true;
                            },
                            () => {
                            }
                        )
                    } else {
                        form.reset();
                        this.submitted = false;
                        this.information_to_user = 'Podany adres e-mail nie jest zarejestrowany';
                    }
                    // form.reset();
                    // this.submitted = false;
                    // this.information_to_user = '';
                    // this.showSuccessPassword = true;
                },
                () => {
                }
            );

        }

    }

}
