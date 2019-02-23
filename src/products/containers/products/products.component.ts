import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProductsState, getAllPizzas } from '../../store';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';

@Component({
    selector: 'products',
    styleUrls: ['products.component.scss'],
    template: `
        <div class="products">
            <div class="products__new">
                <a class="btn btn__ok" routerLink="./new">
                    New Pizza
                </a>
            </div>
            <div class="products__list">
                <div *ngIf="!(pizzas$ | async)?.length">
                    No pizzas, add one to get started.
                </div>
                <pizza-item
                    *ngFor="let pizza of (pizzas$ | async)"
                    [pizza]="pizza"
                >
                </pizza-item>
            </div>
        </div>
    `,
})
export class ProductsComponent implements OnInit {
    public pizzas$: Observable<Pizza[]>;

    constructor(private store: Store<ProductsState>) {}

    public ngOnInit() {
        this.pizzas$ = this.store.pipe(select(getAllPizzas));
    }
}
