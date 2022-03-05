import { Component, OnInit } from '@angular/core';
import {AccountOutput} from "../../../shared/models/account.model";
import {AccountService} from "../../../shared/services/account.service";
import {UserService} from "../../../shared/services/user.service";
import jwt_decode from 'jwt-decode';

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
  token = localStorage.getItem("token");


  constructor(private accountService: AccountService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getFromRegistration().subscribe(
    (information: AccountOutput) => {
            console.log(information.name);
            console.log(information.lastName);
            console.log(information.email);
        },
        () => {
        }
    );
  }


}
