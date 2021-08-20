import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { productReducer } from "./store/product.reducers";
import { ProductEffects } from "./store/product.effects";
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { NavComponent } from "./component/nav/nav.component";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./services/product.service";
import { SpinnerService } from "./services/spinner.service";
import { OurInterceptor } from "./interceptor/our-interceptor.service";

const routes = [
  {
    path: 'products',
    component: ProductListComponent,
    resolve: {
      products: ProductResolver
    }
  },
  {path: 'create-product', component: ProductFormComponent},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([ProductEffects]),
    StoreModule.forRoot({'products': productReducer}),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    ReactiveFormsModule,
  ],
  providers: [
    ProductResolver, ProductService, SpinnerService,
    {provide: HTTP_INTERCEPTORS, useClass: OurInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
