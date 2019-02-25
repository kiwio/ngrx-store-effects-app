import { Topping } from '../../models/topping.model';
import {
    ToppingsAction,
    LOAD_TOPPINGS,
    LOAD_TOPPINGS_FAIL,
    LOAD_TOPPINGS_SUCCESS,
    VISUALISE_TOPPINGS,
} from '../actions';

export interface ToppingsState {
    entities: ToppingsEntities;
    loaded: boolean;
    loading: boolean;
    selectedToppings: number[];
}

export interface ToppingsEntities {
    [id: number]: Topping;
}

export const initialState: ToppingsState = {
    entities: [],
    loaded: false,
    loading: false,
    selectedToppings: [],
};

export function reducer(
    state: ToppingsState = initialState,
    action: ToppingsAction
): ToppingsState {
    switch (action.type) {
        case LOAD_TOPPINGS: {
            return { ...state, loading: true };
        }
        case LOAD_TOPPINGS_SUCCESS: {
            const toppings = action.payload;
            const entities = toppings.reduce(
                (result: ToppingsEntities, topping: Topping) => ({
                    ...result,
                    [topping.id]: topping,
                }),
                {}
            );
            return { ...state, entities, loading: false, loaded: true };
        }

        case LOAD_TOPPINGS_FAIL: {
            return { ...state, loading: false, loaded: false };
        }

        case VISUALISE_TOPPINGS: {
            const selectedToppings = action.payload;
            return { ...state, selectedToppings };
        }
    }

    return state;
}

export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) =>
    state.selectedToppings;
