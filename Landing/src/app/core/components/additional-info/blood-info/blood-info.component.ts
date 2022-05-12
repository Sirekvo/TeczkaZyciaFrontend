import {ViewportScroller} from "@angular/common";
import {Component, OnInit} from '@angular/core';
import {
    AccountOutput,
    BloodTypeInput,
    BloodTypeOutput,
} from "../../../../shared/models/account.model";
import {AccountService} from "../../../../shared/services/account.service";
import {UserService} from "../../../../shared/services/user.service";
import {Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../../../environments/environment';

import {ClipboardService} from "ngx-clipboard";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
    selector: 'app-blood-info',
    templateUrl: './blood-info.component.html',
    styleUrls: ['./blood-info.component.css']
})

/**
 * Account Profile Component
 */
export class BloodInfoComponent implements OnInit {

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

    bloodTypeList: Array<BloodTypeInput>;
    bloodType_tmp: Array<BloodTypeInput>;
    addBloodType: Array<BloodTypeOutput> = [];

    blood_group: Array<string> = ['Podaj grupę krwi', '0', 'A', 'B', 'AB'];
    blood_factor: Array<string> = ['Podaj RH krwi', 'RH+', 'RH-'];
    blood_group_select = this.blood_group[0];
    blood_factor_select = this.blood_factor[0];

    idBloodType: Array<number> = [];
;
    isVisible_bloodType = false;
    isVisible_others = false;
    isVisible = true;
    isVisible_list = true;
    mobile = false;
    footerClass: string;
    hideFooter: boolean;
    activeToggle = 0;
    selectedGroupModule: any;
    selectedFactorModule: any;
    bloodType_counter = 0;
    isCondensed = false;

    bloodID: number;

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

                this.accountService.getBloodType().subscribe(
                    (data: Array<BloodTypeInput>) => {
                        this.bloodTypeList = data;
                        this.bloodType_counter = this.bloodTypeList.length;
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

    show_bloodType_settings() {
        this.isVisible_bloodType = true;
        this.isVisible = false;
        this.bloodType_tmp = this.bloodTypeList.slice();
        if (this.bloodTypeList.length == 1) {
            this.selectedGroupModule = null;
            this.selectedFactorModule = null;
            this.selectedGroupModule = this.bloodTypeList[0].type;
            this.selectedFactorModule = this.bloodTypeList[0].factor;
            this.bloodID = this.bloodTypeList[0].id;
        } else {
            this.selectedGroupModule = this.blood_group[0];
            this.selectedFactorModule = this.blood_factor[0];
        }
    }

    back_to_start() {
        this.isVisible_bloodType = false;
        this.isVisible = true;
        this.idBloodType.splice(0, this.idBloodType.length);

        this.addBloodType.splice(0, this.addBloodType.length);
    }

    back_to_start_complete() {
        if (this.idBloodType.length != 0) {
            for (let i = 0; i < this.idBloodType.length; i++) {
                this.accountService.deleteBloodType(this.idBloodType[i]).subscribe(
                    (response: any) => {

                    },
                    () => {
                    }
                );
            }
            this.refresh();
        }

        this.idBloodType.splice(0, this.idBloodType.length);
        if (this.addBloodType.length != 0) {
            this.accountService.setBloodType(this.addBloodType).subscribe(
                (response: any) => {
                    this.refresh();
                },
                () => {
                }
            );
        }
        this.addBloodType.splice(0, this.addBloodType.length);
        this.isVisible_bloodType = false;
        this.isVisible = true;
    }

    onBloodTypeSubmit(form: any) {
        if (this.bloodType_counter < 2) {
            const bloodType = new BloodTypeInput();
            const bloodType2 = new BloodTypeOutput();
            bloodType.id = 0;
            bloodType.type = form.value.bloodGroupSelect;
            bloodType.factor = form.value.bloodFactorSelect;
            bloodType.appUserID = 0;
            bloodType2.type = form.value.bloodGroupSelect;
            bloodType2.factor = form.value.bloodFactorSelect;
            this.bloodType_tmp.push(bloodType);
            this.addBloodType.push(bloodType2);
            this.bloodType_counter++;
            this.delete_bloodType(0, this.bloodID);
            form.reset();
            this.back_to_start_complete();
        }
    }

    selectOptionGroupHandler(event: any) {
        this.isVisible_others = false;
        this.blood_group_select = event.target.value;
    }

    selectOptionFactorHandler(event: any) {
        this.isVisible_others = false;
        this.blood_factor_select = event.target.value;
    }

    delete_bloodType(rowNumber, id) {
        if (id != 0) {
            this.bloodType_tmp.splice(rowNumber, 1);
            this.bloodType_counter--;
            this.idBloodType.push(id);
        } else {
            this.bloodType_tmp.splice(rowNumber, 1);
            this.bloodType_counter--;
        }
        this.back_to_start_complete();
    }

    copyCode() {
        this.clipboardApi.copyFromContent(this.code);
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
        img_2.src = environment.imgUrl + "/assets/images/card_back.jpg";
        win.document.body.appendChild(img);
        win.document.body.appendChild(img_2);
        img.onload = function () {
            win.print();
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