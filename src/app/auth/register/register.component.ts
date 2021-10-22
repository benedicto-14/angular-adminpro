import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm:FormGroup = this.fb.group({
    nombre:['Benedict', Validators.required],
    email:['test@mail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required,Validators.minLength(6)]],
    terminos:[true, Validators.requiredTrue]
  });

  submitted = false;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router
    ) { }

  crearCuenta(){
    this.submitted = true;
    
    if (this.registerForm.valid) {
      this.userService.postHttpApi(this.registerForm.value,'usuarios')
      .subscribe(res => this.router.navigateByUrl('/'),
      (error) => {
        Swal.fire('Error',error.error.msg,'error');
      });
    }
  }

  campoNoValido(campo:string): boolean {
    if(this.registerForm.get(campo)?.invalid && this.submitted){
      return true;
    }else{
      return false;
    }
  }

  aceptarTerminos(){
    return !this.registerForm.get('terminos')?.value && this.submitted;
  }

}
