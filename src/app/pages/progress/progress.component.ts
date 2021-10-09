import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progressbar1:number = 15;
  progressbar2:number = 75;

  get getProgress1():string{
    return `${this.progressbar1}%`;
  }

  get getProgress2():string{
    return `${this.progressbar2}%`;
  }

}
