import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, filter, take, switchMap, map } from 'rxjs/operators';

import {
    ProductsState,
    getPizzasLoaded,
    LoadPizzas,
    getPizzaEtities,
} from '../store';
import { of } from 'rxjs';
import { PizzaEntities } from '../store/reducers/pizzas.reducer';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
    constructor(private store: Store<ProductsState>) {}

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => this.hasPizza(parseInt(route.params.pizzaId, 10)))
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

    private hasPizza(id: number): Observable<boolean> {
        return this.store.pipe(
            select(getPizzaEtities),
            map((entities: PizzaEntities) => Boolean(entities[id]))
        );
    }
}
