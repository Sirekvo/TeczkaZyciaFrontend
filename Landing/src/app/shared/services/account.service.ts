import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {
    AccountOutput,
    DiseasesOutput,
    DiseasesInput,
    AllergiesOutput,
    AllergiesInput,
    ContactsOutput,
    ContactsInput,
    MedicationsOutput,
    MedicationsInput,
    CodeOutput, EmailOutput
} from '../models/account.model';
import {TokenOutput} from '../models/user.model';
import {UserService} from './user.service';


@Injectable()
export class AccountService {

    constructor(private httpClient: HttpClient) {
    }


    getChronicDiseases(code: string): Observable<Array<DiseasesInput>> {

        return this.httpClient.get<Array<DiseasesInput>>(environment.apiUrl + '/information/chronicDiseases/' + code);
    }

    setChronicDiseases(list: Array<DiseasesOutput>): Observable<any> {

        return this.httpClient.post(environment.apiUrl  + '/information/chronicDiseases', list);
    }

    getAllergies(code: string): Observable<Array<AllergiesInput>>{
        return this.httpClient.get<Array<AllergiesInput>>(environment.apiUrl + '/information/allergic/' + code);
    }

    setAllergies(list: Array<AllergiesOutput>): Observable<any> {

        return this.httpClient.post(environment.apiUrl  + '/information/allergic', list);
    }
    getContacts(code: string): Observable<Array<ContactsInput>>{
        return this.httpClient.get<Array<ContactsInput>>(environment.apiUrl + '/information/contactPerson/' + code);
    }

    setContacts(list: Array<ContactsOutput>): Observable<any> {
        return this.httpClient.post(environment.apiUrl + '/information/contactPerson', list);
    }

    getMedications(code: string): Observable<Array<MedicationsInput>>{
        return this.httpClient.get<Array<MedicationsInput>>(environment.apiUrl + '/information/medications/' + code);
    }

    setMedications(list: Array<MedicationsOutput>): Observable<any> {
        return this.httpClient.post(environment.apiUrl + '/information/medications', list);
    }

    deleteContacts(id: number): Observable<any> {
        return this.httpClient.delete(environment.apiUrl + '/information/contactPerson/' + id);
    }
    deleteAllergies(id: number): Observable<any> {
        return this.httpClient.delete(environment.apiUrl + '/information/allergic/' + id);
    }
    deleteMedications(id: number): Observable<any> {
        return this.httpClient.delete(environment.apiUrl + '/information/medications/' + id);
    }
    deleteChronicDiseases(id: number): Observable<any> {
        return this.httpClient.delete(environment.apiUrl + '/information/chronicDiseases/' + id);
    }
}