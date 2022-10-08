import { Component } from '@angular/core';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Download Sales 1', 'In-Store Sales 1', 'Mail-Order Sales 1'];
  public data1 = {
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059']
      },
    ]
  };

}
