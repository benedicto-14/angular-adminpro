import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { catchError, map } from "rxjs/operators";
import { of } from 'rxjs';

import { ILogin, IResUser, IToken, IUser } from '../interfaces/user';

declare var gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = environment.api_url;
  private auth2:any;

  constructor(
    private http:HttpClient,
    private router:Router,
    private ngZone:NgZone
  ) { 
    this.googleInit();
  }  

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '743079533055-b2kef6au9i1j3jkg9u4bp81mup4m1pld.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }

  postHttpApi(user: IUser | ILogin | IToken, url:string ){
    return this.http.post(`${this.API}/${url}`,user)
    .pipe(
      map( (res:any) => {
        this.saveLocal(res.token,res.usuario);
        return true;
      })
    );
  }

  renovarToken(){
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${this.API}/login/refresh`,{
      headers:{
        'x-token':token
      }
    })
    .pipe(
      map( (res:any) => {
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError( error => of(false))
    );
  }

  saveLocal(token:string, usuario:IResUser){
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    
    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });
    });
  }

}
