import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromProducts from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from '../selectors/toppings.selectors';
import { Pizza } from '../../models/pizza.model';

// pizzas state
export const getPizzaState = createSelector(
    fromProducts.getProductsState,
    state => state.pizzas
);

export const getPizzaEtities = createSelector(
    getPizzaState,
    fromPizzas.getPizzasEntities
);

export const getAllPizzas = createSelector(
    getPizzaEtities,
    entities => Object.values(entities)
);

export const getSelectedPizza = createSelector(
    getPizzaEtities,
    fromRoot.getRouterState,
    (entities: fromPizzas.PizzaEntities, router): Pizza =>
        router.state && entities[router.state.params.pizzaId]
);

export const getPizzaVisualised = createSelector(
    getSelectedPizza,
    fromToppings.getToppingEntities,
    fromToppings.getSelectedToppings,
    (pizza, toppingEntities, selectedToppings) => {
        const toppings = selectedToppings.map(id => toppingEntities[id]);
        return { ...pizza, toppings };
    }
);

export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
);

export const getAllPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
);
