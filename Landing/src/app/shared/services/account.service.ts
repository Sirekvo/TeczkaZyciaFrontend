import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {AccountOutput} from "../models/account.model";
import {TokenOutput} from "../models/user.model";
import {UserService} from "./user.service"


@Injectable()
export class AccountService {

    token: string;
    constructor(private httpClient: HttpClient,
                private userService: UserService) {
    }

    // getFromRegistration(): Observable<AccountOutput> {
    //
    //     return this.httpClient.get<AccountOutput>('http://localhost:8080' + '/information/user', this.userService.getToken());
    // }


}
