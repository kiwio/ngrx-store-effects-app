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

// pizzas state
export const getPizzaState = createSelector(
    getProductsState,
    (state: ProductsState) => state.pizzas
);

export const getAllPizzas = createSelector(
    getPizzaState,
    fromPizzas.getPizzas
);
export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
);
export const getAllPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
);
