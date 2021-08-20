import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Product } from "../interfaces/product";


export const loadProducts = createAction(
  '[Products List] Load Products via Service',
);

export const productsLoaded = createAction(
  '[Products Effect] Products Loaded Successfully',
  props<{ products: Product[] }>()
);

export const createProduct = createAction(
  '[Create Product Component] Create Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Products List Operations] Delete Product',
  props<{ productId: number }>()
);

export const updateProduct = createAction(
  '[Products List Operations] Update Product',
  props<{ update: Update<Product> }>()
);

export const selectedProduct = createAction(
  '[Products List Operations] Select Product',
  props<{ product?: Product }>()
);


export const productActionTypes = {
  loadProducts,
  productsLoaded,
  createProduct,
  deleteProduct,
  updateProduct,
  selectedProduct
};
