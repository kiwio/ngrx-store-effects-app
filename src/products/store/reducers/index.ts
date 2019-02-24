import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';
import { PizzasAction } from '../actions/pizzas.action';

export interface ProductsState {
    pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState, PizzasAction> = {
    pizzas: fromPizzas.reducer,
};

export const getProductsState = createFeatureSelector<ProductsState>(
    'products'
);
