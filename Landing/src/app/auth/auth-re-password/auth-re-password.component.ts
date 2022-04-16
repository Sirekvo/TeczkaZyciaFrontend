import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import { NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-re-password',
  templateUrl: './auth-re-password.component.html',
  styleUrls: ['./auth-re-password.component.css']
})

/**
 * Auth RePassword Component
 */
export class AuthRePasswordComponent implements OnInit {
  form: FormGroup;
  
  email= new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
      }
    )
    // email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    
  }

}
