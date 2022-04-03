import {Component, OnInit} from '@angular/core';
import {
    AccountOutput,
    AllergiesOutput,
    AllergiesInput,
    ContactsOutput,
    ContactsInput,
    DiseasesOutput,
    DiseasesInput,
    MedicationsOutput,
    MedicationsInput
} from "../../../shared/models/account.model";
import {AccountService} from "../../../shared/services/account.service";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})

/**
 * Account Profile Component
 */
export class AccountProfileComponent implements OnInit {

  /**
   * nav light class add
   */
  navClass = 'nav-light';
  name = '';
  lastName = '';
  email = '';
  code = '';
  illnessList: Array<DiseasesInput>;
  allegriesList: Array<AllergiesInput>;
  contactList: Array<ContactsInput>;
  contact_tmp: Array<ContactsInput>;
  addContact: Array<ContactsOutput> = [];
  idContacts: Array<number> = [];
  medicationsList: Array<MedicationsInput>;
  isVisible_illness = false;
  isVisible_contact = false;
  isVisible_allergy = false;
  isVisible_medications = false;
  isVisible_others = false;
  isVisible = true;
  activeToggle = 0;
  how_often : Array<string> = ['Raz na dzień', 'Dwa razy na dzień', 'Trzy razy na dzień', 'Cztery razy na dzień', 'Co drugi dzień', 'Co trzeci dzień', 'Co tydzień', 'Inne'];
  selectedModule : any;
  howOftenSelect = this.how_often[0];
  contact_counter = 0;
  illness_counter = 0;
  allergies_counter = 0;
  medications_counter = 0;

  constructor(private accountService: AccountService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.refresh();
  }
  refresh(){
    this.userService.getFromRegistration().subscribe(
      (information: AccountOutput) => {

          this.name = information.name;
          this.lastName = information.lastName;
          this.email = information.email;
          this.code = information.code;

          this.accountService.getChronicDiseases(information.code).subscribe(
              (data: Array<DiseasesInput>) => {
                  this.illnessList = data;
                  this.illness_counter = this.illnessList.length;
              },
              () => {
              }
          );
          this.accountService.getAllergies(information.code).subscribe(
              (data: Array<AllergiesInput>) => {
                  this.allegriesList = data;
                  this.allergies_counter = this.allegriesList.length;
              },
              () => {
              }
          );
          this.accountService.getContacts(information.code).subscribe(
              (data: Array<ContactsInput>) => {
                  this.contactList = data;
                  this.contact_counter = this.contactList.length;
              },
              () => {
              }
          );
          this.accountService.getMedications(information.code).subscribe(
              (data: Array<MedicationsInput>) => {
                  this.medicationsList = data;
                  this.medications_counter = this.medicationsList.length;
              },
              () => {
              }
          );
      },
      () => {
      }
    );
  }
  logout(){
      this.userService.removeLocalUser();
  }
  show_illness_settings(){
      this.isVisible_illness = true;
      this.isVisible = false;
  }

  show_medications_settings(){
      this.isVisible_medications = true;
      this.isVisible = false;
  }

  show_contact_settings(){
      this.isVisible_contact = true;
      this.isVisible = false;
      this.contact_tmp = this.contactList.slice();
  }

  show_allergies_settings(){
      this.isVisible_allergy = true;
      this.isVisible = false;
  }

  back_to_start(){
      this.isVisible_illness = false;
      this.isVisible_allergy = false;
      this.isVisible_medications = false;
      this.isVisible_contact = false;
      this.isVisible = true;
      this.refresh();
  }
  back_to_start_complete(){
      for(let i = 0; i < this.idContacts.length; i++){
          this.accountService.deleteContacts(this.idContacts[i]).subscribe(
              (response: any) => {
              },
              () => {
              }
          );
      }
      this.idContacts = [];
      this.accountService.setContacts(this.addContact).subscribe(
          (response: any) => {
              console.log(response);
              this.refresh();
          },
          () => {
          }
      );
      this.isVisible_contact = false;
      this.isVisible = true;


  }

  checkSelected(selectedChoice: number){
      this.activeToggle = selectedChoice;
  }
  selectOptionHandler(event: any){
      if (event.target.value === 'Inne'){
          this.isVisible_others = true;
          this.howOftenSelect = event.target.value;
      }
      else{
          this.isVisible_others = false;
          this.howOftenSelect = event.target.value;
      }
  }
  onContactSubmit(form: any) {
      if (this.contact_counter < 3) {
          const contact = new ContactsInput();
          const contact2 = new ContactsOutput();
          contact.id = 0;
          contact.contactPersonRole = form.value.type;
          contact.phoneNumber = form.value.phone;
          contact.appUserID = 0;
          contact2.contactPersonRole = form.value.type;
          contact2.phoneNumber = form.value.phone;
          this.contact_tmp.push(contact);
          this.addContact.push(contact2);
          this.contact_counter++;
          form.reset();
      }
  }
  delete_contact(rowNumber, id){
      if(id != 0){
          this.contact_tmp.splice(rowNumber, 1);
          this.contact_counter--;
          this.idContacts.push(id);
      }
      else{
          this.contact_tmp.splice(rowNumber, 1);
          this.contact_counter--;
      }

  }

}