import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenOutput} from "../models/user.model";
import {AccountOutput} from "../models/account.model";


@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) {
    }

    registerUser(name: string, lastName: string, email: string, password: string): Observable<any> {

        const body = {
            name,
            lastName,
            email,
            password
        };

        const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this.httpClient.post('http://localhost:8080' + '/registration', body, httpOptions);
    }

    setLocalUser(user: TokenOutput, remember: boolean) {
        if (remember || (remember === null && window.sessionStorage.getItem('user') === null)) {
            window.localStorage.setItem('user', JSON.stringify(user));
        } else {
            window.sessionStorage.setItem('user', JSON.stringify(user));
        }
    }
    getLocalUser(): TokenOutput {
        if (window.sessionStorage.getItem('user') === null) {
            return JSON.parse(window.localStorage.getItem('user'));
        } else {
            return JSON.parse(window.sessionStorage.getItem('user'));
        }
    }

    login(email: string, password: string): Observable<TokenOutput> {

        const body = {
            email,
            password
        };

        return this.httpClient.post<TokenOutput> ('http://localhost:8080' + '/login', body);
    }
    getToken(): string {
        const user = this.getLocalUser();

        if (user) {
            return user.token;
        }

        return null;
    }
    getFromRegistration(): Observable<AccountOutput> {



        return this.httpClient.get<AccountOutput>('http://localhost:8080' + '/information/user');
    }
}
