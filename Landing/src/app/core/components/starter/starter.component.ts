// TODO  opisy, background,
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {ChangeDetectorRef} from '@angular/core';
import {DiseasesOutput} from "../../../shared/models/account.model";
import {AccountService} from "../../../shared/services/account.service";
import { Router } from '@angular/router';

@Component({
  selector: 'starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})

/**
 * Auth Signup-three Component
 */

export class StarterComponent implements OnInit {
  activeToggle = 0;
  click = false;
  contactList: Array<Contact> = [];
  allergyList: Array<Allergy> = [];
  illnessList: Array<Illness> = [];
  tabsList: Array<Tabs> = [];
  contact_counter = 0;
  allergy_counter = 0;
  illness_counter = 0;
  tabs_counter = 0;
  i = 0;
  visible = 0;
  isVisible_table_contact = false;
  isVisible_table_alergy = false;
  isVisible_table_illness = false;
  isVisible_table_tabs = false;
  isVisible_others = false;
  isVisible_start = true;
  isVisible_1 = false;
  isVisible_2 = false;
  isVisible_3 = false;
  isVisible_4 = false;
  isVisible_alergy = true;
  isVisible_complete_alergy = false;
  isVisible_contact = true;
  isVisible_complete_contact = false;
  isVisible_tabs = true;
  isVisible_complete_tabs = false;
  isVisible_illness = true;
  isVisible_complete_illness = false;
  how_often: Array<string> = ['Raz na dzień', 'Dwa razy na dzień', 'Trzy razy na dzień', 'Cztery razy na dzień', 'Co drugi dzień', 'Co trzeci dzień', 'Co tydzień', 'Inne'];
  howOftenSelect = this.how_often[0];
  selectedModule : any;
  er1 = 0;
  er2 = 0;
  er3 = 0;
  er4 = 0;


  constructor(private accountService: AccountService,
              private router: Router) {  }

  ngOnInit(): void {
  }

  contact(){
    this.isVisible_start = false;
    this.isVisible_1 = !this.isVisible_1;
    this.activeToggle = 0;
  }
  alergy(){
    this.isVisible_start = false;
    this.isVisible_2 = !this.isVisible_2;
    this.activeToggle = 0;
  }
  tabs(){
    this.isVisible_start = false;
    this.isVisible_3 = !this.isVisible_3;
    this.activeToggle = 0;
  }
  illness(){
    this.isVisible_start = false;
    this.isVisible_4 = !this.isVisible_4;
    this.activeToggle = 0;
  }
  back_to_start(){
    this.isVisible_start = true;
    this.isVisible_1 = false;
    this.isVisible_2 = false;
    this.isVisible_3 = false;
    this.isVisible_4 = false;
    this.visible = 0;
  }
  back_to_start_complete(){
    this.isVisible_start = true;
    this.isVisible_1 = false;
    this.isVisible_contact = false;
    this.isVisible_complete_contact = true;
    this.visible = 0;
    this.accountService.setContacts(this.contactList).subscribe(
      (response: any) => {
        console.log(response);
      },
      () => {
      }
    );
  }
  back_to_start_complete_2(){
    this.isVisible_start = true;
    this.isVisible_2 = false;
    this.isVisible_alergy = false;
    this.isVisible_complete_alergy = true;
    this.visible = 0;
    this.accountService.setAllergies(this.allergyList).subscribe(
      (response: any) => {
        console.log(response);
      },
      () => {
      }
    );
  }
  back_to_start_complete_3(){
    this.isVisible_start = true;
    this.isVisible_3 = false;
    this.isVisible_tabs = false;
    this.isVisible_complete_tabs = true;
    this.visible = 0;
    this.accountService.setMedications(this.tabsList).subscribe(
      (response: any) => {
        console.log(response);
      },
      () => {
      }
    );
  }
  back_to_start_complete_4(){
    this.isVisible_start = true;
    this.isVisible_4 = false;
    this.isVisible_illness = false;
    this.isVisible_complete_illness = true;
    this.visible = 0;
    this.accountService.setChronicDiseases(this.illnessList).subscribe(
        (response: any) => {
          console.log(response);
        },
        () => {
        }
    );
  }

  onContactSubmit(form: any) {
    if (this.contact_counter < 3) {
      const contact = new Contact();
      contact.contactPersonRole = form.value.type;
      contact.phoneNumber = form.value.phone;
      this.contactList.push(contact);
      this.contact_counter++;
      form.reset();
      if (this.visible == 0 && this.er1 == 0) {
        this.isVisible_table_contact = !this.isVisible_table_contact;
        this.visible++;
        this.er1 = 1;
      }
    }
  }

  delete_row_contact(rowNumber: number){
    this.contactList.splice(rowNumber, 1);
    this.contact_counter--;
    if (this.contact_counter == 0){
      this.visible = 0;
      this.isVisible_table_contact = false;
    }
  }
  onAllergySubmit(form: any) {
    if (this.allergy_counter < 15) {
      const allergy = new Allergy();
      allergy.type = form.value.type2;
      allergy.name = form.value.name;
      this.allergyList.push(allergy);
      this.allergy_counter++;
      form.reset();
      if (this.visible == 0 && this.er2 == 0) {
        this.isVisible_table_alergy = !this.isVisible_table_alergy;
        this.visible++;
        this.er2 = 1;
      }
    }
  }
  delete_row_allergy(rowNumber: number){
    this.allergyList.splice(rowNumber, 1);
    this.allergy_counter--;
    if (this.allergy_counter == 0){
      this.visible = 0;
      this.isVisible_table_alergy = false;
    }
  }
  onIllnessSubmit(form: any) {
    if (this.illness_counter < 5) {
      const illness = new Illness();
      illness.name = form.value.name;
      this.illnessList.push(illness);
      this.illness_counter++;
      form.reset();
      if (this.visible == 0 && this.er3 == 0) {
        this.isVisible_table_illness = !this.isVisible_table_illness;
        this.visible++;
        this.er3 = 1;
      }
    }
  }
  delete_row_illness(rowNumber: number){
    this.illnessList.splice(rowNumber, 1);
    this.illness_counter--;
    if (this.illness_counter == 0){
      this.visible = 0;
      this.isVisible_table_illness = false;
    }
  }
  onTabsSubmit(form: any) {
    if (this.tabs_counter < 15) {
      const tabs = new Tabs();
      tabs.name = form.value.name;
      tabs.portion = form.value.portion;
      tabs.howOften = this.howOftenSelect;
      if (tabs.howOften == 'Inne'){
        tabs.howOften = form.value.description;
      }
      this.tabsList.push(tabs);
      this.tabs_counter++;
      form.reset();
      if (this.visible == 0 && this.er4 == 0) {
        this.isVisible_table_tabs = !this.isVisible_table_tabs;
        this.visible++;
        this.er4 = 1;
      }
    }
  }
  delete_row_tabs(rowNumber: number){
    this.tabsList.splice(rowNumber, 1);
    this.tabs_counter--;
    if (this.tabs_counter == 0){
      this.visible = 0;
      this.isVisible_table_tabs = false;
    }
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
  complete(){
    this.accountService.setFirstLogin().subscribe(
      (response: any) => {
        this.router.navigate(['/main']);
      },
      () => {
      }
    );
  }

}

class Contact{
  contactPersonRole: string;
  phoneNumber: number;
}

class Allergy{
  type: string;
  name: string;
}

class Tabs{
  name: string;
  portion: number;
  howOften: string;
}

class Illness{
  name: string;
}

