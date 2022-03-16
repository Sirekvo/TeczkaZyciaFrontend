import { Component, OnInit } from '@angular/core';
import {AccountOutput, DiseasesOutput, AllergiesOutput} from "../../../shared/models/account.model";
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
  allegriesList: Array<AllergiesOutput>

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
            (date: Array<DiseasesOutput>) => {
                this.illnessList = date;
            },
            () => {
            }
            );
            this.accountService.getAllergies(information.code).subscribe(
            (date: Array<AllergiesOutput>) => {
                this.allegriesList = date;
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
}