import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from './../../services/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form:FormGroup

  constructor(private formBuilder:FormBuilder, private sessionService:SessionService) { }

  ngOnInit(): void {
    console.log(this.form)
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(1)]],
      img: ['']
    }, {
      validators: () => {
        if(!this.form) {
          return null
        }
        if(this.form.controls.password.value == this.form.controls.password_confirm.value) {
          return null
        } else {
          return {
            confirmPassword:true
          }
        }
      }
    })
  }

  signUp() {
    console.log(this.form)
    if(this.form.valid) {
      console.log(this.form)
      this.sessionService.signUp(this.form.getRawValue()).then().catch(err => {
        console.error('Failed to signup user', err);
      });
    } else {
      console.log('Fallaron las validaciones')
    }
  }
}
