import { Component, OnInit } from '@angular/core';
import {AccountOutput, DiseasesOutput, AllergiesOutput, ContactsOutput, MedicationsOutput} from "../../../shared/models/account.model";
import {AccountService} from "../../../shared/services/account.service";
import {PatientService} from "../../../shared/services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-find-patient',
    templateUrl: './find-patient.component.html',
    styleUrls: ['./find-patient.component.css']
})

/**
 * Account Profile Component
 */
export class FindPatientComponent implements OnInit {

    /**
     * nav light class add
     */
    navClass = 'nav-light';
    name = '';
    lastName = '';
    email = '';
    code = '';
    illnessList: Array<DiseasesOutput>;
    allegriesList: Array<AllergiesOutput>;
    contactList: Array<ContactsOutput>;
    medicationsList: Array<MedicationsOutput>;

    constructor(private patientService: PatientService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.code = this.route.snapshot.paramMap.get('code');
        console.log("to jest kod: " + this.code);
        this.patientService.getChronicDiseases(this.code).subscribe(
            (data: Array<DiseasesOutput>) => {
                this.illnessList = data;
            },
            () => {
            }
        );
        this.patientService.getAllergies(this.code).subscribe(
            (data: Array<AllergiesOutput>) => {
                this.allegriesList = data;
            },
            () => {
            }
        );
        this.patientService.getContacts(this.code).subscribe(
            (data: Array<ContactsOutput>) => {
                this.contactList = data;
            },
            () => {
            }
        );
        this.patientService.getMedications(this.code).subscribe(
            (data: Array<MedicationsOutput>) => {
                this.medicationsList = data;
            },
            () => {
            }
        );
        // this.userService.getFromRegistration().subscribe(
        //     (information: AccountOutput) => {
        //
        //         this.name = information.name;
        //         this.lastName = information.lastName;
        //         this.email = information.email;
        //
        //
        //
        //     },
        //     () => {
        //     }
        // );


    }
}