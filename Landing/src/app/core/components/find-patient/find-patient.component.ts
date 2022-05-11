import { Component, OnInit } from '@angular/core';
import {AccountOutput, DiseasesOutput, 
        AllergiesOutput, ContactsOutput,
        MedicationsOutput,InformationOutput, OrganDonorOutput} from "../../../shared/models/account.model";
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
    email = '';
    code = '';
    isOrganDonor: boolean;
    illnessList: Array<DiseasesOutput>;
    allegriesList: Array<AllergiesOutput>;
    contactList: Array<ContactsOutput>;
    medicationsList: Array<MedicationsOutput>;
    illness_counter = 0;
    allergies_counter = 0;
    contact_counter = 0;
    medications_counter = 0;

    constructor(private patientService: PatientService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.code = this.route.snapshot.paramMap.get('code');
        this.patientService.getChronicDiseases(this.code).subscribe(
            (data: Array<DiseasesOutput>) => {
                this.illness_counter = data.length;
                this.illnessList = data;
            },
            () => {
            }
        );
        this.patientService.getAllergies(this.code).subscribe(
            (data: Array<AllergiesOutput>) => {
                this.allergies_counter = data.length;
                this.allegriesList = data;
            },
            () => {
            }
        );
        this.patientService.getContacts(this.code).subscribe(
            (data: Array<ContactsOutput>) => {
                this.contact_counter = data.length;
                this.contactList = data;
            },
            () => {
            }
        );
        this.patientService.getMedications(this.code).subscribe(
            (data: Array<MedicationsOutput>) => {
                this.medications_counter = data.length;
                this.medicationsList = data;
            },
            () => {
            }
        );
        this.patientService.getInformation(this.code).subscribe(
            (information: InformationOutput) => {
                this.name = information.name;
                this.email = information.email;
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

    }
}