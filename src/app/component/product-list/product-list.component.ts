import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Product } from "../../interfaces/product";
import { ProductService } from "../../services/product.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { getAllProducts } from "../../store/product.selectors";
import { productActionTypes } from "../../store/product.actions";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  showEdinProductForm = false
  selectedProduct: Product
  products$: Observable<Product[]>;


  constructor(private productService: ProductService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.products$ = this.store.select(getAllProducts);

  }

  onEditClick(product: Product): void {
    this.selectedProduct = product;
    this.showEdinProductForm = true
  }

  onUpdateFormChange(evt: string) {
    if (evt == 'close') {
      this.showEdinProductForm = false
    }
  }

  onDeleteClick(productId: number): void {
    this.store.dispatch(productActionTypes.deleteProduct({productId}));
  }
}
