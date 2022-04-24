import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenOutput} from "../models/user.model";
import {AccountOutput} from "../models/account.model";


@Injectable()
export class UserService {

    constructor(handler: HttpBackend,
                private httpClient: HttpClient,
                private httpClient_withoutToken: HttpClient) {
        this.httpClient_withoutToken = new HttpClient(handler);
    }

    registerUser(name: string, lastName: string, pesel: string, email: string, password: string): Observable<any> {

        const body = {
            name,
            lastName,
            pesel,
            email,
            password
        };

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

        return this.httpClient_withoutToken.post(environment.apiUrl + '/registration', body, httpOptions);
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

        return this.httpClient.post<TokenOutput> (environment.apiUrl + '/login', body);
    }
    removeLocalUser() {
        if (window.sessionStorage.getItem('user') === null) {
            window.localStorage.removeItem('user');
        } else {
            window.sessionStorage.removeItem('user');
        }
    }
    getToken(): string {
        const user = this.getLocalUser();

        if (user) {
            return user.token;
        }

        return null;
    }
    getFromRegistration(): Observable<AccountOutput> {

        return this.httpClient.get<AccountOutput>(environment.apiUrl + '/information/user');
    }
    changePassword(password: string, newPassword: string): Observable<any>{
        const body = {
            password,
            newPassword
        };
        return this.httpClient.post(environment.apiUrl + '/account/change-password', body);
    }
    changeCode(cardCode: string): Observable<any>{
        const body = {
            cardCode
        };

        return this.httpClient.put(environment.apiUrl + '/account/change-code', body);
    }
    forgotPassword(email: string): Observable<any>{
        const body = {
            email
        };
        return this.httpClient_withoutToken.post(environment.apiUrl + '/account/reset-password', body);
    }
    resendMail(email: string): Observable<any>{
        const body = {
            email
        };
        return this.httpClient_withoutToken.post(environment.apiUrl + '/registration/resend', body);
    }
}
