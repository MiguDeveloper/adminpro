import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit, OnDestroy {
  intervalSubs: Subscription;
  constructor() {
    this.retornaObservable().subscribe(
      (resp) => console.log(`Subs: ${resp}`),
      (error) => console.log('Error: ' + error),
      () => console.log('Obs completado')
    );
    // Ejemplo con interval de rxjs
    this.intervalSubs = this.retornaIntervalo().subscribe((rpta) =>
      console.log(rpta)
    );
  }

  ngOnInit(): void {}

  retornaObservable(): Observable<number> {
    let i = 0;
    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        } else if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });

    return obs$;
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(1000).pipe(
      take(10),
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
    return intervalo$;
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
}
