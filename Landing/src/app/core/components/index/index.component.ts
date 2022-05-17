import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Router} from "@angular/router";
import {AccountService} from "../../../shared/services/account.service";
import {PatientService} from "../../../shared/services/patient.service";


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

/***
 * Hospital Component
 */
export class IndexComponent implements OnInit {

    active = 'card';
    code = '';
    information_to_user = '';

    constructor(private modalService: NgbModal,
                private patientService: PatientService,
                private router: Router) {
    }

    ngOnInit(): void {

    }

    findPatient(form: any) {
        this.patientService.existsCode(form.value.code).subscribe(
            (data: any) => {
                if (data.exists == true) {
                    this.router.navigate(['/patient', form.value.code]);
                } else {
                    this.information_to_user = 'Nie znaleziono pacjenta o podanym kodzie';
                    form.reset();
                }
            },
            () => {
            }
        );
    }

}


