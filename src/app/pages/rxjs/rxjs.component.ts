import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }

  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        // take(10),
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
      );
  }

}
