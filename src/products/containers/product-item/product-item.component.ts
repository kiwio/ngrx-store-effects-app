import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { ProductsState, getSelectedPizza } from '../../store';

@Component({
    selector: 'product-item',
    styleUrls: ['product-item.component.scss'],
    template: `
        <div class="product-item">
            <pizza-form
                [pizza]="pizza$ | async"
                [toppings]="toppings"
                (selected)="onSelect($event)"
                (create)="onCreate($event)"
                (update)="onUpdate($event)"
                (remove)="onRemove($event)"
            >
                <pizza-display [pizza]="visualise"> </pizza-display>
            </pizza-form>
        </div>
    `,
})
export class ProductItemComponent implements OnInit {
    public pizza$: Observable<Pizza>;
    public visualise: Pizza;
    public toppings: Topping[];

    constructor(private store: Store<ProductsState>) {}

    public ngOnInit() {
        this.pizza$ = this.store.select(getSelectedPizza);
    }

    public onSelect(event: number[]) {}

    public onCreate(event: Pizza) {}

    public onUpdate(event: Pizza) {}

    public onRemove(event: Pizza) {}
}
