import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppState } from "./reducers";
import { areProductsLoaded } from "./store/product.selectors";
import { filter, first, tap } from "rxjs/operators";
import { loadProducts } from "./store/product.actions";


@Injectable()
export class ProductResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areProductsLoaded),
        tap((ProductsLoaded) => {
          if (!ProductsLoaded) {
            this.store.dispatch(loadProducts());
          }

        }),
        filter(ProductsLoaded => ProductsLoaded),
        first()
      );
  }
}
