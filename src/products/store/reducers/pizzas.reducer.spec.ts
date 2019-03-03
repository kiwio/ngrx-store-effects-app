import { initialState } from './pizzas.reducer';
import { reducer } from './pizzas.reducer';
import { LoadPizzas, LoadPizzasSuccess } from '../actions';
import { Pizza } from '../../models/pizza.model';

describe('PizzasReducer', () => {
    describe('undefined action', () => {
        it('should return default state', () => {
            const action = {} as any;
            const state = reducer(undefined, action);

            expect(state).toBe(initialState);
        });
    });

    describe('LoadPizzas action', () => {
        it('should return correct state', () => {
            const action = new LoadPizzas();
            const state = reducer(initialState, action);

            expect(state.entities).toEqual({});
            expect(state.loaded).toBe(false);
            expect(state.loading).toBe(true);
        });
    });

    describe('LoadPizzasSuccess action', () => {
        it('should return correct state', () => {
            const pizzas: Pizza[] = [
                {
                    id: 1,
                    name: 'Pizza 1',
                    toppings: [],
                },
                {
                    id: 2,
                    name: 'Pizza 2',
                    toppings: [],
                },
            ];
            const entities = {
                1: pizzas[0],
                2: pizzas[1],
            };
            const action = new LoadPizzasSuccess(pizzas);
            const state = reducer(initialState, action);

            expect(state.entities).toEqual(entities);
            expect(state.loaded).toBe(true);
            expect(state.loading).toBe(false);
        });
    });
});
