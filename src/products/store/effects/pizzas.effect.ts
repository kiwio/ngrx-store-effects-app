import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Go } from '../../../app/store';
import {
    LOAD_PIZZAS,
    LoadPizzasSuccess,
    LoadPizzasFail,
    CREATE_PIZZA,
    CreatePizza,
    CreatePizzaSuccess,
    CreatePizzaFail,
    UPDATE_PIZZA,
    UpdatePizza,
    UpdatePizzaSuccess,
    UpdatePizzaFail,
    REMOVE_PIZZA,
    RemovePizza,
    RemovePizzaSuccess,
    RemovePizzaFail,
    CREATE_PIZZA_SUCCESS,
    UPDATE_PIZZA_SUCCESS,
    REMOVE_PIZZA_SUCCESS,
} from '../actions';
import { PizzasService } from '../../services';
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

    @Effect()
    public createPizza$ = this.actions$.pipe(
        ofType(CREATE_PIZZA),
        map((action: CreatePizza) => action.payload),
        switchMap(pizza =>
            this.pizzaService.createPizza(pizza).pipe(
                map(pizza => new CreatePizzaSuccess(pizza)),
                catchError(error => of(new CreatePizzaFail(error)))
            )
        )
    );

    @Effect()
    public createPizzaSuccess$ = this.actions$.pipe(
        ofType(CREATE_PIZZA_SUCCESS),
        map((action: CreatePizzaSuccess) => action.payload),
        map(
            pizza =>
                new Go({
                    path: ['/products', pizza.id],
                })
        )
    );

    @Effect()
    public updatePizza$ = this.actions$.pipe(
        ofType(UPDATE_PIZZA),
        map((action: UpdatePizza) => action.payload),
        switchMap(pizza =>
            this.pizzaService.updatePizza(pizza).pipe(
                map(pizza => new UpdatePizzaSuccess(pizza)),
                catchError(error => of(new UpdatePizzaFail(error)))
            )
        )
    );

    @Effect()
    public removePizza$ = this.actions$.pipe(
        ofType(REMOVE_PIZZA),
        map((action: RemovePizza) => action.payload),
        switchMap(pizza =>
            this.pizzaService.removePizza(pizza).pipe(
                map(() => new RemovePizzaSuccess(pizza)),
                catchError(error => of(new RemovePizzaFail(error)))
            )
        )
    );

    @Effect()
    public updateRemovePizzaSuccess$ = this.actions$.pipe(
        ofType(UPDATE_PIZZA_SUCCESS, REMOVE_PIZZA_SUCCESS),
        map(
            () =>
                new Go({
                    path: ['/products'],
                })
        )
    );
}
