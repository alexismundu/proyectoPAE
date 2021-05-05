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
      img: [null]
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
    const formData = new FormData();
    
    formData.append('img', this.form.get('img').value);
    formData.append('name', this.form.get('name').value);
    formData.append('last_name', this.form.get('last_name').value);
    formData.append('email', this.form.get('email').value);
    formData.append('password', this.form.get('password').value);
    formData.append('password_confirm', this.form.get('password_confirm').value);
    formData.append('age', this.form.get('age').value);

    if(this.form.valid) {
      //this.sessionService.signUp(this.form.getRawValue()).then().catch(err => {
      this.sessionService.signUp(formData).then().catch(err => {
          console.error('Failed to signup user', err);
      });
    } else {
      console.log('Fallaron las validaciones')
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('img').setValue(file);
    }
  }
}
