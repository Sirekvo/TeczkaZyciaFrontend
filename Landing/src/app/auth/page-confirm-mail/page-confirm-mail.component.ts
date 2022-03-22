import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-confirm-mail',
  templateUrl: './page-confirm-mail.component.html',
  styleUrls: ['./page-confirm-mail.component.css']
})

/**
 * Page Thankyou Component
 */
export class PageConfirmMailComponent implements OnInit {

  firstName = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.firstName = this.route.snapshot.paramMap.get('firstName');
    console.log(this.firstName);
  }

}
