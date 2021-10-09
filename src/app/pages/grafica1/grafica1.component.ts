import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  title1:string = 'Ventas';
  labels1:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  info1:number[] = [350, 450, 100];

  title2:string = 'Ventas';
  labels2:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  info2:number[] = [50, 150, 120];
  
  title3:string = 'Ventas';
  labels3:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  info3:number[] = [250, 130, 70];

  title4:string = 'Ventas';
  labels4:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  info4:number[] = [505, 91, 72];

}
