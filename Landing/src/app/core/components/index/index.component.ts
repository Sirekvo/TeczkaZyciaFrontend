import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


}
