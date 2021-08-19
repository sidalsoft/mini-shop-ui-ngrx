import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { Product } from "../../interfaces/product";
import { createProduct, productActionTypes } from "../../store/product.actions";
import { Update } from "@ngrx/entity";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productToBeUpdated: Product;

  constructor(private store: Store<AppState>) {
  }

  productForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.productForm = new FormGroup({
      "name": new FormControl(this.productToBeUpdated?.name, [Validators.required, Validators.minLength(3)]),
      "desc": new FormControl(this.productToBeUpdated?.desc, [Validators.required, Validators.minLength(25)]),
      "price": new FormControl(this.productToBeUpdated?.price, Validators.pattern(/\-?\d+(\.\d*)?/gm)),
      "quantity": new FormControl(this.productToBeUpdated?.quantity, Validators.pattern(/\-?\d+(\.\d*)?/gm))
    });
  }

  onSaveClick(): void {
    const product: Product = {
      name: this.productForm.value.name,
      desc: this.productForm.value.desc,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity
    };
    if (this.productToBeUpdated) {
      const update: Update<Product> = {
        id: this.productToBeUpdated.id,
        changes: {
          ...this.productToBeUpdated,
          ...this.productForm.value
        }
      };

      this.store.dispatch(productActionTypes.updateProduct({update}));
      this.productToBeUpdated = null
    } else {
      this.store.dispatch(createProduct({product}));
    }
  }


}
