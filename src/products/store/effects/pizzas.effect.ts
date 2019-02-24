import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { LOAD_PIZZAS, LoadPizzasSuccess, LoadPizzasFail } from '../actions';
import { PizzasService } from '../../services';
import { Pizza } from '../../models/pizza.model';
import { of } from 'rxjs';

@Injectable()
export class PizzasEffects {
    constructor(
        private actions$: Actions,
        private pizzaService: PizzasService
    ) {}

    @Effect()
    public loadPizzas$ = this.actions$.pipe(
        ofType(LOAD_PIZZAS),
        switchMap(() =>
            this.pizzaService.getPizzas().pipe(
                map(pizzas => new LoadPizzasSuccess(pizzas)),
                catchError(error => of(new LoadPizzasFail(error)))
            )
        )
    );
}
