import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromProducts from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
    fromProducts.getProductsState,
    state => state.toppings
);

export const getToppingEntities = createSelector(
    getToppingsState,
    fromToppings.getToppingEntities
);

export const getSelectedToppings = createSelector(
    getToppingsState,
    fromToppings.getSelectedToppings
);

export const getAllToppings = createSelector(
    getToppingEntities,
    entities => Object.values(entities)
);

export const getToppingsLoaded = createSelector(
    getToppingsState,
    fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
    getToppingsState,
    fromToppings.getToppingsLoading
);
