import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { productActionTypes } from './product.actions';
import { Product } from "../interfaces/product";

export interface ProductState extends EntityState<Product> {
  productsLoaded: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState = adapter.getInitialState({
  productsLoaded: false
});

export const productReducer = createReducer(
  initialState,

  on(productActionTypes.productsLoaded, (state, action) => {
    return adapter.addMany(
      action.products,
      {...state, productsLoaded: true}
    );
  }),

  on(productActionTypes.createProduct, (state, action) => {
    return adapter.addOne(action.product, state);
  }),

  on(productActionTypes.deleteProduct, (state, action) => {
    return adapter.removeOne(action.productId, state);
  }),

  on(productActionTypes.updateProduct, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
