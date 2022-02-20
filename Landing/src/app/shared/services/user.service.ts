import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenOutput} from "../models/user.model";


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
    login(email: string, password: string): Observable<TokenOutput> {

        const body = {
            email,
            password
        };

        return this.httpClient.post<TokenOutput> ('http://localhost:8080' + '/login', body);
    }
}
