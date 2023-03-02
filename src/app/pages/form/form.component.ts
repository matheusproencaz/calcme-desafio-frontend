import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExceptionHandlerService } from 'src/app/services/ExceptionHandler/exception-handler.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  @ViewChild('fform') formDirective: any;

  formErrors: any = {
    'name': '',
    'email': '',
    'phone': ''
  }

  validationMessages: any = {
    'name': {
      'required':'Digite o nome de usuário',
    },
    'email': {
      'required':'Digite seu E-mail',
    },
    'phone': {
      'required':'Digite seu telefone',
    }
  }

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private handler: ExceptionHandlerService
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    this.userService.createUser(this.form.value)
      .subscribe(success => {
        if(success)
          this.router.navigate(['/user'], { state: {showMessage: true} });
      });
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    })
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any){
    if(!this.form) return;
    const form = this.form;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];

          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
