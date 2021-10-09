import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title:string = '';
  @Input() labels:string[] = [];
  @Input() info:number[] = [];

  // Doughnut
  /* public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ]; */

  public colors:Colors[] = [
    { backgroundColor: ['#FFD166','#06D6A0','#118AB2'] }
  ];

}
