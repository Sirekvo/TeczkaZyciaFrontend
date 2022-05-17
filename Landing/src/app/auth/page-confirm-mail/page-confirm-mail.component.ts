import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-page-confirm-mail',
    templateUrl: './page-confirm-mail.component.html',
    styleUrls: ['./page-confirm-mail.component.css']
})

/**
 * Page Thankyou Component
 */
export class PageConfirmMailComponent implements OnInit {

    firstName = '';
    email = '';

    constructor(private route: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.firstName = this.route.snapshot.queryParamMap.get('name');
        this.email = this.route.snapshot.queryParamMap.get('email');

    }

    resend() {
        this.userService.resendMail(this.email).subscribe(
            (response: any) => {
                // console.log('Wyslano');
            },
            () => {
            }
        );
    }

}
