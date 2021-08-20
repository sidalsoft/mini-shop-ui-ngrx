import { ProductState, selectIds } from './product.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from './product.reducers';

export const productFeatureSelector = createFeatureSelector<ProductState>('products');

export const getAllProducts = createSelector(
  productFeatureSelector,
  selectAll
);

export const areProductsLoaded = createSelector(
  productFeatureSelector,
  state => state.productsLoaded
);

export const selectedProduct = createSelector(
  productFeatureSelector,
  (productFeatureSelector) => productFeatureSelector.selectedProduct)
