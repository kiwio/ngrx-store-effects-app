import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { ToppingsService } from '../../services/toppings.service';
import {
    LOAD_TOPPINGS,
    LoadToppingsSuccess,
    LoadToppingsFail,
} from '../actions/toppings.action';
import { Topping } from 'src/products/models/topping.model';

@Injectable()
export class ToppingsEffects {
    constructor(
        private actions$: Actions,
        private toppingsService: ToppingsService
    ) {}

    @Effect()
    public loadToppings$ = this.actions$.pipe(
        ofType(LOAD_TOPPINGS),
        switchMap(() =>
            this.toppingsService.getToppings().pipe(
                map((toppings: Topping[]) => new LoadToppingsSuccess(toppings)),
                catchError(error => of(new LoadToppingsFail(error)))
            )
        )
    );
}
