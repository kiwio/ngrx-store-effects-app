import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromProducts from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import { Pizza } from '../../models/pizza.model';
import { RouterStateUrl } from '../../../app/store';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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

export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
);

export const getAllPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
);
