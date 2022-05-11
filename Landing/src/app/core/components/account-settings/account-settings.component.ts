import { ViewportScroller } from "@angular/common";
import {Component, Type, OnInit} from '@angular/core';
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
import { NgbModal, NgbActiveModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'ngbd-modal-confirm',
    template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Usuwanie konta</h4>
      <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p><strong>Czy na pewno chcesz usunąć swój profil z <span class="text-primary">Teczki Życia</span> ?</strong></p>
      <p>Wszystkie informacje przypisane do tego konta zostaną usunięte.
      <span class="text-danger">Tej operacji nie można cofnąć.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Anuluj</button>
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')" click="deleteUser()">Potwierdź</button>
    </div>
    `
  })

  export class NgbdModalConfirm {
    constructor(public modal: NgbActiveModal) {}
  }
  const MODALS: {[name: string]: Type<any>} = {
    focusFirst: NgbdModalConfirm,
    // autofocus: NgbdModalConfirmAutofocus
  };

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
    pesel = '';
    old_code = '';
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
    submitted_data = false;
    submitted_pesel = false;

    showSuccessCode = false;
    showSuccessPassword = false;
    showSuccessName = false;
    showSuccessPESEL = false;
    
    changePasswordForm: FormGroup;
    changeCodeForm: FormGroup;
    changeDataForm: FormGroup;
    changePESELForm: FormGroup;

    cardImg: any;
    cardImg_copy: any;

    constructor(private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private clipboardApi: ClipboardService,
        private formBuilder: FormBuilder,
        private patientService: PatientService,
        private _modalService: NgbModal,
        private sanitizer: DomSanitizer) {

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
            newCode: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,}$")]), // 6 characters without special characters
        },{
        });
        this.changeDataForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            newCode: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,}$")]), // 6 characters without special characters
            newPESEL: new FormControl('', Validators.pattern("^[0-9]{11}$")), // 11 letters
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
        this.getCard();
        this.userService.getFromRegistration().subscribe(
            (information: AccountOutput) => {

                this.name = information.name;
                this.lastName = information.lastName;
                this.email = information.email;
                this.code = information.code;
                this.pesel = information.pesel;
                this.old_code = this.code;
                this.code_link = environment.codeUrl + this.code;
                this.changeDataForm.controls['name'].setValue(this.name);
                this.changeDataForm.controls['lastName'].setValue(this.lastName);
                this.changeDataForm.controls['newCode'].setValue(this.code);
                this.changeDataForm.controls['newPESEL'].setValue(this.pesel);
            },
            () => {
            }
        );
        // this.patientService.getOrganDonor(this.code).subscribe(
        //     (inputValue: Boolean) => {
        //         this.isOrganDonor = inputValue;
        //         console.log("Wartosc startowa isOrganDonor " + this.isOrganDonor );
        //     },
        //     () => {
        //     }
        // );
    }

    get f() { return this.changePasswordForm.controls; }
    get fa() { return this.changeCodeForm.controls; }
    get fData() { return this.changeDataForm.controls; }
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
                                form.controls['newCode'].setValue(this.code);
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
                        form.controls['newCode'].setValue(this.code);
                    }
                },
                () => {
                }
            );
        }
    }
    changeData(form: any){
        this.submitted_data = true;

        if (this.changeDataForm.invalid) {
            return;
        }
        else{
            this.patientService.existsCode(form.value.newCode).subscribe(
                (data: any) => {
                    if(data.exists == false){
                        this.userService.changeCode(form.value.newCode).subscribe(
                            (response: any) => {
                                this.userService.changeInformation(form.value.name, form.value.lastName, form.value.newPESEL).subscribe(
                                    (data: any) => {
                                        this.submitted_data = false;
                                        this.showSuccessName = true;
                                        this.refresh();
                                    },
                                    () => {
                                    }
                                );
                                this.submitted_data = false;
                                this.information_to_user2 = '';
                            },
                            () => {
                            }
                        );
                    }
                    else{
                        this.information_to_user2 = 'Podany kod jest już zajęty';
                        this.submitted_data = false;
                    }
                },
                () => {
                }
            );
        }
    }
    open(name: string) { 
        this._modalService.open(MODALS[name]).result.then((result) => {
           if(result == 'Ok click') {
              this.deleteUser(); 
            //   this.userService.deleteUser();
            this.router.navigate(['/index']);
            this.logout();
           } 
        }, (reason) => {
            if (reason === ModalDismissReasons.ESC ||
                reason === ModalDismissReasons.BACKDROP_CLICK ||
                reason == 'cancel click' || 
                reason == 'Cross click'){
                }
        });
    }

    deleteUser(){
        console.log("Funkcja do usuwania usera");
    }
    copyCode(){
        this.clipboardApi.copyFromContent(this.code);
    }
    getCard() : void {
        this.accountService.getCardBase64_2().subscribe(
            (val) => {
                let objectURL = 'data:image/jpg;base64,' + val.img;
                this.cardImg = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                this.cardImg_copy = this.cardImg;
            },
            response => {
            });
    }
    logout() {
        this.userService.removeLocalUser();
    }

}