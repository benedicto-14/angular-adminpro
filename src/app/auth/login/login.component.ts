import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

declare var gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = this.fb.group({
    email:['test@mail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required,Validators.minLength(6)]],
    remember:[false]
  });

  submitted:boolean = false;
  auth2:any;

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private userService:UserService,
    private ngZone:NgZone
    ) { }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    this.loginForm.patchValue({email,remember:true});
    this.renderButton();
  }

  login(){
    if(this.loginForm.get('remember')?.value){
      localStorage.setItem('email',this.loginForm.get('email')?.value);
    }else{
      localStorage.removeItem('email');
    }

    this.userService.postHttpApi(this.loginForm.value,'login')
    .subscribe(res => this.router.navigateByUrl('/'),
    (error) => {
      Swal.fire('Error',error.error.msg,'error');
    });
  }

  campoNoValido(campo:string): boolean {
    if(this.loginForm.get(campo)?.invalid && this.submitted){
      return true;
    }else{
      return false;
    }
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '743079533055-b2kef6au9i1j3jkg9u4bp81mup4m1pld.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element:any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
          
          
          const id_token = googleUser.getAuthResponse().id_token;

          this.userService.postHttpApi({token:id_token},'login/google')
          .subscribe(res =>{ 
            
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/');
            });

          },
          (error) => {
            Swal.fire('Error',error.error.msg,'error');
          });

          
        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
