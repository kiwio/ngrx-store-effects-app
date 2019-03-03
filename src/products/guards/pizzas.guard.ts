import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';
import { ProductsState, getPizzasLoaded, LoadPizzas } from '../store';
import { of } from 'rxjs';

@Injectable()
export class PizzasGuard implements CanActivate {
    constructor(private store: Store<ProductsState>) {}
    public canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    private checkStore(): Observable<boolean> {
        return this.store.pipe(
            select(getPizzasLoaded),
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new LoadPizzas());
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }
}
