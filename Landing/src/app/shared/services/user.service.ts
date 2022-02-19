import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';


@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) {
    }

    registerUser(firstName: string, lastName: string, email: string, password: string): Observable<any> {

        const body = {
            firstName,
            lastName,
            email,
            password
        };

        return this.httpClient.post(environment.apiUrl + 'registration', body);
    }
}
