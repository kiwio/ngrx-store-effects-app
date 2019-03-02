import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import {
    ProductsState,
    getSelectedPizza,
    getAllToppings,
    VisualiseToppings,
    getPizzaVisualised,
    CreatePizza,
    UpdatePizza,
    RemovePizza,
} from '../../store';

@Component({
    selector: 'product-item',
    styleUrls: ['product-item.component.scss'],
    template: `
        <div class="product-item">
            <pizza-form
                [pizza]="pizza$ | async"
                [toppings]="toppings$ | async"
                (selected)="onSelect($event)"
                (create)="onCreate($event)"
                (update)="onUpdate($event)"
                (remove)="onRemove($event)"
            >
                <pizza-display [pizza]="visualise$ | async"> </pizza-display>
            </pizza-form>
        </div>
    `,
})
export class ProductItemComponent implements OnInit {
    public pizza$: Observable<Pizza>;
    public visualise$: Observable<Pizza>;
    public toppings$: Observable<Topping[]>;

    constructor(private store: Store<ProductsState>) {}

    public ngOnInit() {
        this.pizza$ = this.store.pipe(
            select(getSelectedPizza),
            tap((pizza: Pizza) => {
                const exists = Boolean(pizza && pizza.toppings);
                const toppings = exists
                    ? pizza.toppings.map(topping => topping.id)
                    : [];
                this.store.dispatch(new VisualiseToppings(toppings));
            })
        );
        this.toppings$ = this.store.pipe(select(getAllToppings));
        this.visualise$ = this.store.pipe(select(getPizzaVisualised));
    }

    public onSelect(event: number[]) {
        this.store.dispatch(new VisualiseToppings(event));
    }

    public onCreate(event: Pizza) {
        this.store.dispatch(new CreatePizza(event));
    }

    public onUpdate(event: Pizza) {
        this.store.dispatch(new UpdatePizza(event));
    }

    public onRemove(event: Pizza) {
        const remove = window.confirm('Are you sure?');
        if (remove) {
            this.store.dispatch(new RemovePizza(event));
        }
    }
}
