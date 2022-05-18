import {ViewportScroller} from "@angular/common";
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
    MedicationsInput, CardBase64, OrganDonorOutput
} from "../../../shared/models/account.model";
import {AccountService} from "../../../shared/services/account.service";
import {UserService} from "../../../shared/services/user.service";
import { PatientService } from "src/app/shared/services/patient.service";
import {Router} from "@angular/router";
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {ClipboardService} from "ngx-clipboard";
import {NgForm, Validators} from '@angular/forms';
import {DomSanitizer} from "@angular/platform-browser";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngbd-modal-content',
    template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Zakup Karty</h4>
      </div>
      <div class="modal-body">
        <p>Aby zamówić swoją kartę wyślij do nas mail na adres</p><p style="text-align: center;"><span class="text-primary">10.teczka.zycia@gmail.com</span></p>
        <p>W tytule wiadmości napisz <i>Zakup karty - [kod]</i>, gdzie w wyznaczone miejsce wpisz swój indywidualny kod.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="modal.close('confirm click')">Ok</button>
      </div>
    `
})

export class NgbdModalContent {
    constructor(public modal: NgbActiveModal){
    }
}

const MODALS: { [name: string]: Type<any> } = {
    cardFirst: NgbdModalContent,
    // autofocus: NgbdModalConfirmAutofocus
};

@Component({
    selector: 'app-account-profile',
    templateUrl: './account-profile.component.html',
    styleUrls: ['./account-profile.component.css']
})

/**
 * Account Profile Component
 */
export class AccountProfileComponent implements OnInit {

    /**
     * nav light class add
     */
    navClass = 'nav-light';
    name = '';
    lastName = '';
    email = '';
    code = '';
    illnessList: Array<DiseasesInput>;
    illness_tmp: Array<DiseasesInput>;
    addIllness: Array<DiseasesOutput> = [];

    code_link: string;

    allegriesList: Array<AllergiesInput>;
    allergies_tmp: Array<AllergiesInput>;
    addAllergies: Array<AllergiesOutput> = [];

    contactList: Array<ContactsInput>;
    contact_tmp: Array<ContactsInput>;
    addContact: Array<ContactsOutput> = [];

    medicationsList: Array<MedicationsInput>;
    medications_tmp: Array<MedicationsInput>;
    addMedications: Array<MedicationsOutput> = [];

    idContacts: Array<number> = [];
    idAllergies: Array<number> = [];
    idMedications: Array<number> = [];
    idIllness: Array<number> = [];

    isVisible_illness = false;
    isVisible_contact = false;
    isVisible_allergy = false;
    isVisible_medications = false;
    isVisible_others = false;
    isVisible = true;
    isVisible_list = true;
    mobile = false;
    footerClass: string;
    hideFooter: boolean;
    activeToggle = 0;
    how_often: Array<string> = ['Raz na dzień', 'Dwa razy na dzień', 'Trzy razy na dzień', 'Cztery razy na dzień', 'Co drugi dzień', 'Co trzeci dzień', 'Co tydzień', 'Inne'];
    selectedModule: any;
    howOftenSelect = this.how_often[0];
    contact_counter = 0;
    illness_counter = 0;
    allergies_counter = 0;
    medications_counter = 0;

    contact_counter_tmp: number;
    illness_counter_tmp: number;
    allergies_counter_tmp: number;
    medications_counter_tmp: number;

    isCondensed = false;

    contactForm: FormGroup;

    information_to_user = true;
    submitted = false;
    cardImg: any;
    cardImg_copy: any;
    isOrganDonor = false;
    objectURL: string;

    constructor(private accountService: AccountService,
                private userService: UserService,
                private patientService: PatientService,
                private router: Router,
                private scroller: ViewportScroller,
                private clipboardApi: ClipboardService,
                private formBuilder: FormBuilder,
                private modalService: NgbModal,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.refresh();
        this.contactForm = this.formBuilder.group({
            phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{9,}$")]),
            type: new FormControl('', [Validators.required]),
            optionalName: new FormControl('',),
        }, {});
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

                this.code_link = environment.codeUrl + this.code;

                this.accountService.getChronicDiseases(information.code).subscribe(
                    (data: Array<DiseasesInput>) => {
                        this.illnessList = data;
                        this.illness_counter = this.illnessList.length;
                    },
                    () => {
                    }
                );
                this.accountService.getAllergies(information.code).subscribe(
                    (data: Array<AllergiesInput>) => {
                        this.allegriesList = data;
                        this.allergies_counter = this.allegriesList.length;
                    },
                    () => {
                    }
                );
                this.accountService.getContacts(information.code).subscribe(
                    (data: Array<ContactsInput>) => {
                        this.contactList = data;
                        this.contact_counter = this.contactList.length;
                    },
                    () => {
                    }
                );
                this.accountService.getMedications(information.code).subscribe(
                    (data: Array<MedicationsInput>) => {
                        this.medicationsList = data;
                        this.medications_counter = this.medicationsList.length;
                    },
                    () => {
                    }
                );
                this.patientService.getOrganDonor(this.code).subscribe(
                    (information: OrganDonorOutput) => {
                        this.isOrganDonor = information.isOrganDonor;
                    },
                    () => {
                    }
                );
            },
            () => {
            }
        );
        // console.log(this.medicationsList.length);
    }

    get fphone() {
        return this.contactForm.controls;
    }

    logout() {
        this.userService.removeLocalUser();
    }

    show_illness_settings() {
        this.isVisible_illness = true;
        this.isVisible = false;
        this.illness_tmp = this.illnessList.slice();

        this.contact_counter_tmp = this.contact_counter;
        this.medications_counter_tmp = this.medications_counter;
        this.allergies_counter_tmp = this.allergies_counter;
        this.illness_counter_tmp = this.illness_counter;
    }

    show_medications_settings() {
        this.isVisible_medications = true;
        this.isVisible = false;
        this.medications_tmp = this.medicationsList.slice();

        this.contact_counter_tmp = this.contact_counter;
        this.medications_counter_tmp = this.medications_counter;
        this.allergies_counter_tmp = this.allergies_counter;
        this.illness_counter_tmp = this.illness_counter;

        // console.log(this.medications_counter);
        // console.log(this.medications_counter_tmp);
    }

    show_contact_settings() {
        this.isVisible_contact = true;
        this.isVisible = false;
        this.contact_tmp = this.contactList.slice();

        this.contact_counter_tmp = this.contact_counter;
        this.medications_counter_tmp = this.medications_counter;
        this.allergies_counter_tmp = this.allergies_counter;
        this.illness_counter_tmp = this.illness_counter;

    }

    show_allergies_settings() {
        this.isVisible_allergy = true;
        this.isVisible = false;
        this.allergies_tmp = this.allegriesList.slice();

        this.contact_counter_tmp = this.contact_counter;
        this.medications_counter_tmp = this.medications_counter;
        this.allergies_counter_tmp = this.allergies_counter;
        this.illness_counter_tmp = this.illness_counter;
    }

    back_to_start() {
        this.isVisible_illness = false;
        this.isVisible_allergy = false;
        this.isVisible_medications = false;
        this.isVisible_contact = false;
        this.isVisible = true;
        this.information_to_user = true;
        this.idContacts.splice(0, this.idContacts.length);
        this.idAllergies.splice(0, this.idAllergies.length);
        this.idMedications.splice(0, this.idMedications.length);
        this.idIllness.splice(0, this.idIllness.length);
        this.addContact.splice(0, this.addContact.length);
        this.addAllergies.splice(0, this.addAllergies.length);
        this.addMedications.splice(0, this.addMedications.length);
        this.addIllness.splice(0, this.addIllness.length);
        // this.medicationsList.length

        this.submitted = false;

        this.contact_counter = this.contact_counter_tmp;
        this.medications_counter = this.medications_counter_tmp;
        this.allergies_counter = this.allergies_counter_tmp;
        this.illness_counter = this.illness_counter_tmp;

    }

    back_to_start_complete() {
        if (this.idContacts.length != 0) {
            for (let i = 0; i < this.idContacts.length; i++) {
                this.accountService.deleteContacts(this.idContacts[i]).subscribe(
                    (response: any) => {
                    },
                    () => {
                    }
                );
            }
            this.refresh();
        }
        this.idContacts.splice(0, this.idContacts.length);
        if (this.addContact.length != 0) {
            this.accountService.setContacts(this.addContact).subscribe(
                (response: any) => {
                    this.refresh();
                },
                () => {
                }
            );
        }
        this.addContact.splice(0, this.addContact.length);

        this.isVisible_contact = false;
        this.isVisible = true;
        this.information_to_user = true;


    }

    back_to_start_complete_2() {
        if (this.idAllergies.length != 0) {
            for (let i = 0; i < this.idAllergies.length; i++) {
                this.accountService.deleteAllergies(this.idAllergies[i]).subscribe(
                    (response: any) => {
                    },
                    () => {
                    }
                );
            }
            this.refresh();
        }

        this.idAllergies.splice(0, this.idAllergies.length);
        if (this.addAllergies.length != 0) {
            this.accountService.setAllergies(this.addAllergies).subscribe(
                (response: any) => {
                    this.refresh();
                },
                () => {
                }
            );
        }
        this.addAllergies.splice(0, this.addAllergies.length);
        this.isVisible_allergy = false;
        this.isVisible = true;
    }

    back_to_start_complete_3() {
        if (this.idMedications.length != 0) {
            for (let i = 0; i < this.idMedications.length; i++) {
                this.accountService.deleteMedications(this.idMedications[i]).subscribe(
                    (response: any) => {
                    },
                    () => {
                    }
                );
            }
            this.refresh();
        }

        this.idMedications.splice(0, this.idMedications.length);
        if (this.addMedications.length != 0) {
            this.accountService.setMedications(this.addMedications).subscribe(
                (response: any) => {
                    this.refresh();
                },
                () => {
                }
            );
        }
        this.addMedications.splice(0, this.addMedications.length);
        this.isVisible_medications = false;
        this.isVisible = true;
    }

    back_to_start_complete_4() {
        if (this.idIllness.length != 0) {
            for (let i = 0; i < this.idIllness.length; i++) {
                this.accountService.deleteChronicDiseases(this.idIllness[i]).subscribe(
                    (response: any) => {

                    },
                    () => {
                    }
                );
            }
            this.refresh();
        }

        this.idIllness.splice(0, this.idIllness.length);
        if (this.addIllness.length != 0) {
            this.accountService.setChronicDiseases(this.addIllness).subscribe(
                (response: any) => {
                    this.refresh();
                },
                () => {
                }
            );
        }
        this.addIllness.splice(0, this.addIllness.length);
        this.isVisible_illness = false;
        this.isVisible = true;
    }

    checkSelected(selectedChoice: number) {
        this.activeToggle = selectedChoice;
        this.information_to_user = false;
    }

    selectOptionHandler(event: any) {
        if (event.target.value === 'Inne') {
            this.isVisible_others = true;
            this.howOftenSelect = event.target.value;
        } else {
            this.isVisible_others = false;
            this.howOftenSelect = event.target.value;
        }
    }

    onContactSubmit(form: any) {
        this.submitted = true;
        if (this.contactForm.invalid) {
            return;
        } else {
            if (this.contact_counter < 3) {
                const contact = new ContactsInput();
                const contact2 = new ContactsOutput();
                contact.id = 0;
                // console.log("imie " + form.value.optionalName);
                contact.contactPersonRole = form.value.type;
                contact.phoneNumber = form.value.phone;
                contact.appUserID = 0;
                contact.optionalName = form.value.optionalName;
                contact2.contactPersonRole = form.value.type;
                contact2.optionalName = form.value.optionalName;
                contact2.phoneNumber = form.value.phone;
                this.activeToggle = 0;
                this.information_to_user = true;
                this.contact_tmp.push(contact);
                this.addContact.push(contact2);
                this.contact_counter++;
                form.reset();
                this.submitted = false;
            }
        }
    }

    clean_form(form: any) {
        form.reset();
        this.activeToggle = 0;
        this.submitted = false;
    }

    delete_contact(rowNumber, id) {
        if (id != 0) {
            this.contact_tmp.splice(rowNumber, 1);
            this.contact_counter--;
            this.idContacts.push(id);
        } else {
            this.contact_tmp.splice(rowNumber, 1);
            this.contact_counter--;
        }
    }

    onAllergySubmit(form: any) {
        if (this.allergies_counter < 15) {
            const allergy = new AllergiesInput();
            const allergy2 = new AllergiesOutput();
            allergy.id = 0;
            allergy.type = form.value.type2;
            allergy.name = form.value.name;
            allergy.appUserID = 0;
            allergy2.type = form.value.type2;
            allergy2.name = form.value.name;
            this.allergies_tmp.push(allergy);
            this.addAllergies.push(allergy2);
            this.allergies_counter++;
            form.reset();
        }
    }

    delete_allergy(rowNumber, id) {
        if (id != 0) {
            this.allergies_tmp.splice(rowNumber, 1);
            this.allergies_counter--;
            this.idAllergies.push(id);
        } else {
            this.allergies_tmp.splice(rowNumber, 1);
            this.allergies_counter--;
        }
    }

    onMedicationsSubmit(form: any) {
        if (this.medications_counter < 15) {
            const tabs = new MedicationsInput();
            const tabs2 = new MedicationsOutput();
            tabs.id = 0;
            tabs.name = form.value.name;
            tabs.portion = form.value.portion;
            tabs.howOften = this.howOftenSelect;
            tabs.appUserID = 0;
            tabs2.name = form.value.name;
            tabs2.portion = form.value.portion;
            tabs2.howOften = this.howOftenSelect;
            this.medications_tmp.push(tabs);
            this.addMedications.push(tabs2);
            this.medications_counter++;
            form.reset();
        }
    }

    delete_medications(rowNumber, id) {
        if (id != 0) {
            this.medications_tmp.splice(rowNumber, 1);
            this.medications_counter--;
            this.idMedications.push(id);
        } else {
            this.medications_tmp.splice(rowNumber, 1);
            this.medications_counter--;
        }
    }

    onIllnessSubmit(form: any) {
        if (this.illness_counter < 5) {
            const illness = new DiseasesInput();
            const illness2 = new DiseasesOutput();
            illness.id = 0;
            illness.name = form.value.name;
            illness.appUserID = 0;
            illness2.name = form.value.name;
            this.illness_tmp.push(illness);
            this.addIllness.push(illness2);
            this.illness_counter++;
            form.reset();
        }
    }

    delete_illness(rowNumber, id) {
        if (id != 0) {
            this.illness_tmp.splice(rowNumber, 1);
            this.illness_counter--;
            this.idIllness.push(id);
        } else {
            this.illness_tmp.splice(rowNumber, 1);
            this.illness_counter--;
        }
    }

    copyCode() {
        this.clipboardApi.copyFromContent(this.code);
    }

    toogleEditable(event) {
        if (event.target.checked) {
            this.isOrganDonor = true;
            this.changeOrganDonor();
        } else {
            this.isOrganDonor = false;
            this.changeOrganDonor();
        }
        // console.log("Wartosc isOrganDonor " + this.isOrganDonor);
    }

    changeOrganDonor() {
        this.userService.changeOrganDonor(this.isOrganDonor).subscribe(
            (data: any) => {
                ;
            },
            () => {
            }
        );
    }

    open(name: string) {
        this.modalService.open(MODALS[name]).result.then((result) => {
            if (result == 'Ok click') {
            }
        }, (reason) => {
            if (reason === ModalDismissReasons.ESC ||
                reason === ModalDismissReasons.BACKDROP_CLICK ||
                reason == 'cancel click' ||
                reason == 'Cross click' ||
                reason == 'confirm click') {
            }
        });
    }

    getCard(): void {
        this.accountService.getCardBase64().subscribe(
            (val) => {
                this.objectURL = 'data:image/jpg;base64,' + val.img;
                this.cardImg = this.sanitizer.bypassSecurityTrustUrl(this.objectURL);
                this.cardImg_copy = this.cardImg;
            },
            response => {
            });

    }

    printCard() {
        var win = window.open("");
        var img = win.document.createElement("img");
        var img_2 = win.document.createElement("img");
        img.src = this.objectURL;
        img.setAttribute("width",'50%');
        img_2.setAttribute("width",'50%');
        img_2.src = environment.imgUrl + "/assets/images/card_back.jpg";
        win.document.body.appendChild(img);
        win.document.body.appendChild(img_2);
        img.onload = function () {
            win.print();
            win.onafterprint=function(){ win.close();}
        };
    }

    zoomCard() {
        var win = window.open("");
        var img = win.document.createElement("img");
        var img_2 = win.document.createElement("img");
        img.src = this.objectURL;
        img_2.src = environment.imgUrl + "/assets/images/card_back.jpg";
        win.document.body.appendChild(img);
        win.document.body.appendChild(img_2);
    }

}