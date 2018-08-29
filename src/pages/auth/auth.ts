import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit{

  mode: string;
  authForm : FormGroup;
  errorMessage: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private authService: AuthService, 
              private formBuilder: FormBuilder) {}

  ngOnInit(){
    console.log('ngOnInit AuthPage');
    this.mode = this.navParams.get('mode');
    if(this.mode==undefined)
      this.mode='connect';
    console.log(this.mode);
    this.initForm();
  }

  initForm(){
    this.authForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }
  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.mode === 'new') {
      this.authService.signUpUser(email, password).then(
        () => {
          console.log("bsahtek le nouveau");
        },
        (error) => {
          this.errorMessage=error;
        }
      );
    } else if (this.mode === 'connect') {
      this.authService.signInUser(email, password).then(
        () => {
          console.log("le salam");
        },
        (error) => {
          this.errorMessage=error;
        }
      );
    }
  }

}
