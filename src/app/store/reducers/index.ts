import {
    RouterReducerState,
    routerReducer,
    RouterStateSerializer,
} from '@ngrx/router-store';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Params,
} from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface RouterState {
    routerReducer: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<RouterState> = {
    routerReducer: routerReducer,
};

export const getRouterState = createFeatureSelector<
    RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let routeSnapshot: ActivatedRouteSnapshot = routerState.root;
        // get parameters from the very last url segment which is on the right
        while (routeSnapshot.firstChild) {
            routeSnapshot = routeSnapshot.firstChild;
        }
        return {
            url: routerState.url,
            queryParams: routerState.root.queryParams,
            params: routeSnapshot.params,
        };
    }
}
