import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {AccountOutput, DiseasesOutput} from '../models/account.model';
import {TokenOutput} from '../models/user.model';
import {UserService} from './user.service';


@Injectable()
export class AccountService {




    constructor(private httpClient: HttpClient) {
    }

    getChronicDiseases(code: string): Observable<Array<DiseasesOutput>> {

        return this.httpClient.get<Array<DiseasesOutput>>(environment.apiUrl + '/information/chronicDiseases/' + code);
    }


}
