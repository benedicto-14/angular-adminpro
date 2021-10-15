import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo:string;
  sub$:Subscription;

  constructor(private router:Router) {
    this.sub$ = this.getCurrentTitle().subscribe((data:any) => {
      this.titulo = data.titulo;
      document.title = `Admin Pro - ${this.titulo}`
    });;
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getCurrentTitle(): Observable<String> {
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event:any) => event.snapshot.firstChild === null ),
      map(event => event.snapshot.data)
    );
  }

}

