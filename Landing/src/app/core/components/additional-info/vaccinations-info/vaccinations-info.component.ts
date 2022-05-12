import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import {
    AccountOutput,
    VaccinationsOutput,
    VaccinationsInput,
} from "../../../../shared/models/account.model";
import { AccountService } from "../../../../shared/services/account.service";
import { UserService } from "../../../../shared/services/user.service";
import { Router } from "@angular/router";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from "rxjs";
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../../../environments/environment';
import { ClipboardService } from "ngx-clipboard";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
    selector: 'app-vaccinations-info',
    templateUrl: './vaccinations-info.component.html',
    styleUrls: ['./vaccinations-info.component.css']
})

/**
 * Account Profile Component
 */
export class VaccinationsInfoComponent implements OnInit {

    /**
     * nav light class add
     */
    model: NgbDateStruct;
    date = new Date();
    showNavigationArrows = true;
    showNavigationIndicators = false;

    navClass = 'nav-light';
    name = '';
    lastName = '';
    email = '';
    code = '';

    code_link: string;

    vaccinationsList: Array<VaccinationsInput>;
    vaccinations_tmp: Array<VaccinationsInput>;
    addVaccinations: Array<VaccinationsOutput> = [];

    idVaccinations: Array<number> = [];

    isVisible_vaccinations = false;
    isVisible_others = false;
    isVisible = true;
    isVisible_list = true;
    mobile = false;
    footerClass: string;
    hideFooter: boolean;
    activeToggle = 0;
    selectedModule: any;
    vaccinations_counter = 0;
    vaccinations_tmp_counter = 0;
    isCondensed = false;

    submitted = false;

    objectURL: string;
    cardImg: any;
    cardImg_copy: any;

    constructor(private accountService: AccountService,
        private userService: UserService,
        private router: Router,
        private scroller: ViewportScroller,
        private modalService: NgbModal,
        private clipboardApi: ClipboardService,
        private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.refresh();
        if (window.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
        }
        window.onresize = () => this.mobile = window.innerWidth <= 991;
        // let today = new Date();
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

                this.accountService.getVaccinations(information.code).subscribe(
                    (data: Array<VaccinationsInput>) => {
                        this.vaccinationsList = data;
                        this.vaccinations_counter = this.vaccinationsList.length;
                    },
                    () => {
                    }
                );
            },
            () => {
            }
        );
    }

    logout() {
        this.userService.removeLocalUser();
    }

    show_vaccinations_settings() {
        this.isVisible_vaccinations = true;
        this.isVisible = false;
        this.vaccinations_tmp = this.vaccinationsList.slice();
        this.vaccinations_tmp_counter = this.vaccinations_counter;
        // let today = new Date();
        // this.date.year=today.getFullYear();
        // this.date.month=today.getMonth();
        // this.date.day=today.getDay();
    }

    back_to_start() {
        this.isVisible_vaccinations = false;
        this.isVisible = true;
        this.idVaccinations.splice(0, this.idVaccinations.length);

        this.addVaccinations.splice(0, this.addVaccinations.length);
        this.vaccinations_counter = this.vaccinations_tmp_counter;
        this.submitted = false;
    }

    back_to_start_complete_5() {
        if (this.idVaccinations.length != 0) {
            for (let i = 0; i < this.idVaccinations.length; i++) {
                this.accountService.deleteVaccinations(this.idVaccinations[i]).subscribe(
                    (response: any) => {

                    },
                    () => {
                    }
                );
            }
            this.refresh();
        }

        this.idVaccinations.splice(0, this.idVaccinations.length);
        if (this.addVaccinations.length != 0) {
            this.accountService.setVaccinations(this.addVaccinations).subscribe(
                (response: any) => {
                    console.log(response);
                    this.refresh();
                },
                () => {
                }
            );
        }
        this.addVaccinations.splice(0, this.addVaccinations.length);
        this.isVisible_vaccinations = false;
        this.isVisible = true;
        
        // this.submitted = false;
    }

    onVaccinationsSubmit(form: any) {
        this.submitted = true;
        if (this.vaccinations_counter < 10) {
            const vaccinations = new VaccinationsInput();
            const vaccinations2 = new VaccinationsOutput();
            const new_date = form.value.dp.year + "-" + form.value.dp.month + "-" + form.value.dp.day;
            vaccinations.id = 0;
            vaccinations.name = form.value.name;
            vaccinations.date = new_date;
            vaccinations.appUserID = 0;
            vaccinations2.name = form.value.name;
            vaccinations2.date = new_date;
            this.vaccinations_tmp.push(vaccinations);
            this.addVaccinations.push(vaccinations2);
            this.vaccinations_counter++;
            form.reset();
            this.submitted = false;
        }
    }

    delete_vaccinations(rowNumber, id) {
        if (id != 0) {
            this.vaccinations_tmp.splice(rowNumber, 1);
            this.vaccinations_counter--;
            this.idVaccinations.push(id);
        } else {
            this.vaccinations_tmp.splice(rowNumber, 1);
            this.vaccinations_counter--;
        }
    }

    clean_form(form: any){
        form.reset();
        this.activeToggle=0;
        this.submitted = false;
    }

    copyCode(){
        this.clipboardApi.copyFromContent(this.code);
    }

    getCard() : void {
        this.accountService.getCardBase64().subscribe(
            (val) => {
                this.objectURL = 'data:image/jpg;base64,' + val.img;
                this.cardImg = this.sanitizer.bypassSecurityTrustUrl(this.objectURL);
                this.cardImg_copy = this.cardImg;
            },
            response => {
            });
    }
    printCard(){
        var win = window.open("");
        var img = win.document.createElement("img");
        var img_2 = win.document.createElement("img");
        img.src = this.objectURL;
        img_2.src= environment.imgUrl + "/assets/images/card_back.jpg";
        win.document.body.appendChild(img);
        win.document.body.appendChild(img_2);
        img.onload = function(){
            win.print();
        };
    }
    zoomCard(){
        var win = window.open("");
        var img = win.document.createElement("img");
        var img_2 = win.document.createElement("img");
        img.src = this.objectURL;
        img_2.src= environment.imgUrl + "/assets/images/card_back.jpg";
        win.document.body.appendChild(img);
        win.document.body.appendChild(img_2);
    }


}