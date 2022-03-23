import { Component, OnInit } from '@angular/core';
import {AccountOutput, DiseasesOutput, AllergiesOutput, ContactsOutput, MedicationsOutput} from "../../../shared/models/account.model";
import {AccountService} from "../../../shared/services/account.service";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";


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
  illnessList: Array<DiseasesOutput>;
  allegriesList: Array<AllergiesOutput>;
  contactList: Array<ContactsOutput>;
  medicationsList: Array<MedicationsOutput>;
  isVisible_illness = false;

  constructor(private accountService: AccountService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getFromRegistration().subscribe(
    (information: AccountOutput) => {

            this.name = information.name;
            this.lastName = information.lastName;
            this.email = information.email;
            this.code = information.code;

            this.accountService.getChronicDiseases(information.code).subscribe(
            (data: Array<DiseasesOutput>) => {
                this.illnessList = data;
            },
            () => {
            }
            );
            this.accountService.getAllergies(information.code).subscribe(
            (data: Array<AllergiesOutput>) => {
                this.allegriesList = data;
            },
            () => {
            }
            );
            this.accountService.getContacts(information.code).subscribe(
            (data: Array<ContactsOutput>) => {
                this.contactList = data;
            },
            () => {
            }
            );
            this.accountService.getMedications(information.code).subscribe(
            (data: Array<MedicationsOutput>) => {
                 this.medicationsList = data;
            },
            () => {
            }
            );
        },
        () => {
        }
    );


  }
  logout(){
      this.userService.removeLocalUser();
  }
    show_illness_settings(){
      this.isVisible_illness = true;
    }
}