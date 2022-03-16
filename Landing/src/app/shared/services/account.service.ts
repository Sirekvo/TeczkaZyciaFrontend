import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {AccountOutput, DiseasesOutput, AllergiesOutput} from '../models/account.model';
import {TokenOutput} from '../models/user.model';
import {UserService} from './user.service';


@Injectable()
export class AccountService {




    constructor(private httpClient: HttpClient) {
    }

    getChronicDiseases(code: string): Observable<Array<DiseasesOutput>> {

        return this.httpClient.get<Array<DiseasesOutput>>(environment.apiUrl + '/information/chronicDiseases/' + code);
    }

    setChronicDiseases(list: Array<DiseasesOutput>): Observable<any> {

        return this.httpClient.post(environment.apiUrl  + '/information/chronicDiseases', list);
    }

    getAllergies(code: string): Observable<Array<AllergiesOutput>>{
        return this.httpClient.get<Array<AllergiesOutput>>(environment.apiUrl + '/information/allergic/' + code);
    }

    setAllergies(list: Array<AllergiesOutput>): Observable<any> {

        return this.httpClient.post(environment.apiUrl  + '/information/allergic', list);
    }

}
