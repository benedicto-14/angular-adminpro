import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private themeLink = document.querySelector('#theme');

  constructor() { 
    const theme = localStorage.getItem('theme') || 'assets/css/colors/default.css';
    this.themeLink?.setAttribute('href',theme);
  }

  changeTheme(theme:string):void{
    let newurl = `assets/css/colors/${theme}.css`;
    this.themeLink?.setAttribute('href',newurl);
    localStorage.setItem('theme',newurl);
    
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){

    //No recomendable
    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {
      
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const urlTheme = `assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.themeLink?.getAttribute('href');

      if(urlTheme === currentTheme){
        elem.classList.add('working');
      }

    });
    
  }

}
