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
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {MustMatch} from "../../../shared/match_validator/must_match.validator";
import { ClipboardService } from "ngx-clipboard";
import { NgForm, Validators } from '@angular/forms';


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
    changePasswordForm: FormGroup;
    isVisible_list = true;
    submitted = false;
    information_to_user = '';


    constructor(private accountService: AccountService,
                private userService: UserService,
                private router: Router,
                private formBuilder: FormBuilder,
                private clipboardApi: ClipboardService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.changePasswordForm = this.formBuilder.group({
            password: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required,  Validators.pattern("^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,16}$")]),
        }, {
            validator: MustMatch('newPassword', 'confirmPassword'),
            //validator2: MustMatch('password', 'NewPassword'),
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

    changePassword(form: any){
        this.submitted = true;

        if (this.changePasswordForm.invalid) {
            return;
        }
        else{
            this.userService.ChangePassword(form.value.password,form.value.newPassword).subscribe(
                (data: any) => {
                },
                () => {
                    this.information_to_user = 'Stare hasło nie jest prawidlowe';
                    form.reset();
                }
            );
        }
        
    }
    copyCode(){
        this.clipboardApi.copyFromContent(this.code);
    }


}