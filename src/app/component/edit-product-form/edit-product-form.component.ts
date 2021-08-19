import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from "../../interfaces/product";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { Update } from "@ngrx/entity";
import { productActionTypes } from "../../store/product.actions";

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit {

  @Input() product: Product | undefined

  @Output() valueChange = new EventEmitter<string>();

  productForm: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      "name": new FormControl(this.product?.name, [Validators.required, Validators.minLength(3)]),
      "desc": new FormControl(this.product?.desc, [Validators.required, Validators.minLength(25)]),
      "price": new FormControl(this.product?.price, Validators.pattern(/\-?\d+(\.\d*)?/gm)),
      "quantity": new FormControl(this.product?.quantity, Validators.pattern(/\-?\d+(\.\d*)?/gm))
    });
  }

  onSaveClick(): void {
    const update: Update<Product> = {
      id: this.product.id,
      changes: {
        ...this.product,
        ...this.productForm.value
      }
    };

    this.store.dispatch(productActionTypes.updateProduct({update}));
    this.valueChange.emit('close')
  }

  onCloseClick(): void {
    this.valueChange.emit('close')
  }


}
