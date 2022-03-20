import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

/***
 * Hospital Component
 */
export class IndexComponent implements OnInit {

  active = 'top';
  code = '';

  constructor(private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
  }

  findPatient(form: any){
    this.router.navigate(['/patient', form.value.code]);

  }

}
