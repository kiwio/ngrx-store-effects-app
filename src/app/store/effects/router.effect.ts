import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import { GO, Go, BACK, FORWARD } from '../actions';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}

    @Effect({ dispatch: false })
    public navigate$ = this.actions$.pipe(
        ofType(GO),
        map((action: Go) => action.payload),
        tap(({ path, query: queryParams, extras }) => {
            this.router.navigate(path, { queryParams, ...extras });
        })
    );

    @Effect({ dispatch: false })
    public navigateBack$ = this.actions$.pipe(
        ofType(BACK),
        tap(() => this.location.back())
    );

    @Effect({ dispatch: false })
    public navigateForward$ = this.actions$.pipe(
        ofType(FORWARD),
        tap(() => this.location.forward())
    );
}
