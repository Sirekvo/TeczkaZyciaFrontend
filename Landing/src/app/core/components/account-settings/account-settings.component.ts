import { ViewportScroller } from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {
    AccountOutput,
    AllergiesOutput,
    AllergiesInput,
    ContactsOutput,
    ContactsInput,
    DiseasesOutput,
    DiseasesInput,
    MedicationsOutput,
    MedicationsInput
} from "../../../shared/models/account.model";
import {AccountService} from "../../../shared/services/account.service";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";
import {environment} from '../../../../environments/environment';
import {Form, FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {MustMatch, MustMatch2} from "../../../shared/match_validator/must_match.validator";
import { ClipboardService } from "ngx-clipboard";
import { NgForm, Validators } from '@angular/forms';
import {HttpErrorResponse} from "@angular/common/http";
import {PatientService} from "../../../shared/services/patient.service";


@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.css']
})

/**
 * Account Profile Component
 */
export class AccountSettingsComponent implements OnInit {


    navClass = 'nav-light';
    name = '';
    lastName = '';
    email = '';
    code = '';
    code_link: string;
    mobile = false;
    footerClass: string;
    hideFooter: boolean;
    isVisible_list = true;
    information_to_user = '';
    information_to_user2 = '';
    information_to_user3 = '';
    submitted = false;
    submitted_code = false;
    submitted_name = false;
    submitted_pesel = false;

    showSuccessCode = false;
    showSuccessPassword = false;
    showSuccessName = false;
    showSuccessPESEL = false;

    changePasswordForm: FormGroup;
    changeCodeForm: FormGroup;
    changeNameForm: FormGroup;
    changePESELForm: FormGroup;


    constructor(private accountService: AccountService,
                private userService: UserService,
                private router: Router,
                private clipboardApi: ClipboardService,
                private formBuilder: FormBuilder,
                private patientService: PatientService) {

    }

    ngOnInit(): void {
        this.refresh();

        this.changePasswordForm = this.formBuilder.group({
            password: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$")]), // min 8 chracters and max 16 with min 1 capital letter, 1 digit and 1 special character
            confirmPassword: new FormControl('', [Validators.required]),
        },{
            validators: [MustMatch('newPassword', 'confirmPassword'),
                MustMatch2('password', 'newPassword')]
        });
        this.changeCodeForm = this.formBuilder.group({
            newCode: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6}$")]), // 6 characters without special characters
        },{
        });
        this.changeNameForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
        },{
        });

        this.changePESELForm = this.formBuilder.group({
            newPESEL: new FormControl('', Validators.pattern("^[0-9]{11}$")), // 11 letters
        },{
        });

        if (window.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
        }
        window.onresize = () => this.mobile = window.innerWidth <= 991;
    }
    refresh() {
        this.userService.getFromRegistration().subscribe(
            (information: AccountOutput) => {

                this.name = information.name;
                this.lastName = information.lastName;
                this.email = information.email;
                this.code = information.code;

                this.code_link = environment.codeUrl + this.code;
            },
            () => {
            }
        );
    }

    get f() { return this.changePasswordForm.controls; }
    get fa() { return this.changeCodeForm.controls; }
    get fName() { return this.changeNameForm.controls; }
    get fPESEL() { return this.changePESELForm.controls; }

    changePassword(form: any){
        this.submitted = true;


        // stop here if form is invalid
        if (this.changePasswordForm.invalid) {
            return;
        }
        else{
            this.userService.changePassword(form.value.password, form.value.newPassword).subscribe(
                (data: any) => {
                    form.reset();
                    this.submitted = false;
                    this.information_to_user = '';
                    this.showSuccessPassword = true;
                },
                () => {
                    this.information_to_user = 'Stare hasło nie jest prawidlowe';
                    form.reset();
                    this.submitted = false;
                }
            );
        }
    }
    changeCode(form: any){
        this.submitted_code = true;
        if (this.changeCodeForm.invalid) {
            return;
        }
        else{
            this.patientService.existsCode(form.value.newCode).subscribe(
                (data: any) => {
                    if(data.exists == false){
                        this.userService.changeCode(form.value.newCode).subscribe(
                            (response: any) => {
                                form.reset();
                                this.refresh();
                                this.submitted_code = false;
                                this.information_to_user2 = '';
                                this.showSuccessCode = true;
                            },
                            () => {
                            }
                        );
                    }
                    else{
                        this.information_to_user2 = 'Podany kod jest już zajęty';
                        this.submitted_code = false;
                        form.reset();
                    }
                },
                () => {
                }
            );
        }
    }
    changeName(form: any){
        this.submitted_name = true;

        if (this.changeNameForm.invalid) {
            return;
        }
        else{
            this.userService.changeName(form.value.name, form.value.lastName).subscribe(
                (data: any) => {
                    form.reset();
                    this.submitted_name = false;
                    this.showSuccessName = true;
                    this.refresh();
                },
                () => {
                }
            );
        }
    }
    changePESEL(form: any){
        this.submitted_pesel = true;

        if (this.changePESELForm.invalid) {
            return;
        }
        else{
            this.userService.changePESEL(form.value.newPESEL).subscribe(
                (data: any) => {
                    form.reset();
                    this.submitted_pesel = false;
                    this.showSuccessPESEL = true;
                },
                () => {
                }
            );
        }
    }
    deleteUser(){


    }
    copyCode(){
        this.clipboardApi.copyFromContent(this.code);
    }
    logout() {
        this.userService.removeLocalUser();
    }


}