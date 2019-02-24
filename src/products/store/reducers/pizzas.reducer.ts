import { Pizza } from '../../models/pizza.model';
import {
    PizzasAction,
    LOAD_PIZZAS,
    LOAD_PIZZAS_FAIL,
    LOAD_PIZZAS_SUCCESS,
} from '../actions/pizzas.action';
import { access } from 'fs';

export interface PizzaState {
    entities: PizzaEntities;
    loaded: boolean;
    loading: boolean;
}

export interface PizzaEntities {
    [id: number]: Pizza;
}

export const initalState: PizzaState = {
    entities: {},
    loaded: false,
    loading: false,
};

export function reducer(
    state: PizzaState = initalState,
    action: PizzasAction
): PizzaState {
    switch (action.type) {
        case LOAD_PIZZAS: {
            return { ...state, loading: true };
        }
        case LOAD_PIZZAS_SUCCESS: {
            const data = action.payload;
            const entities = data.reduce(
                (result: PizzaEntities, pizza: Pizza) => ({
                    ...result,
                    [pizza.id]: pizza,
                }),
                { ...state.entities }
            );
            return { ...state, entities, loading: false, loaded: true };
        }
        case LOAD_PIZZAS_FAIL: {
            return { ...state, loading: false, loaded: false };
        }
    }

    return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
