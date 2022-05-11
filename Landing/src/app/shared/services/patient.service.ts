import {HttpClient, HttpHeaders, HttpBackend} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {
    AccountOutput,
    DiseasesOutput,
    AllergiesOutput,
    ContactsOutput,
    MedicationsOutput,
    OrganDonorOutput,
    CodeOutput, EmailOutput,
    InformationOutput
} from '../models/account.model';


@Injectable()
export class PatientService {

    private httpClient: HttpClient;
    constructor(handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
    }
    getChronicDiseases(code: string): Observable<Array<DiseasesOutput>> {
        return this.httpClient.get<Array<DiseasesOutput>>(environment.apiUrl + '/information/chronicDiseases/' + code);
    }
    getAllergies(code: string): Observable<Array<AllergiesOutput>>{
        return this.httpClient.get<Array<AllergiesOutput>>(environment.apiUrl + '/information/allergic/' + code);
    }
    getContacts(code: string): Observable<Array<ContactsOutput>>{
        return this.httpClient.get<Array<ContactsOutput>>(environment.apiUrl + '/information/contactPerson/' + code);
    }
    getMedications(code: string): Observable<Array<MedicationsOutput>>{
        return this.httpClient.get<Array<MedicationsOutput>>(environment.apiUrl + '/information/medications/' + code);
    }

    existsCode(code: string): Observable<Array<CodeOutput>>{
        return this.httpClient.get<Array<CodeOutput>>(environment.apiUrl + '/account/check-code/' + code);
    }

    existsEmail(email: string): Observable<Array<EmailOutput>>{
        return this.httpClient.get<Array<EmailOutput>>(environment.apiUrl + '/account/check-email/' + email);
    }

    getInformation(code: string): Observable<InformationOutput>{
        return this.httpClient.get<InformationOutput>(environment.apiUrl + '/information/stars/' + code);
    }

    getOrganDonor(code: string): Observable<OrganDonorOutput>{
        return this.httpClient.get<OrganDonorOutput>(environment.apiUrl + "/information/organ-donor/" + code);
    }
}
