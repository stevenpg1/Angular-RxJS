import { ChangeDetectionStrategy, Component } from '@angular/core';

import {  catchError, combineLatest, EMPTY, map, BehaviorSubject, Subscription } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productWithCategories$, 
    this.categorySelectedAction$
  ])
  .pipe(
    map(([products, selectedCategoryId]) => 
      products.filter(product =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  categories$ = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  // products2$ = this.productservice.productwithcategories$
  // .pipe(
  //   catcherror(err => {
  //     this.errormessage = err;
  //     return empty;
  //   })
  // );

  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
function catcheError(arg0: (err: any) => import("rxjs").Observable<never>): import("rxjs").OperatorFunction<Product[], unknown> {
  throw new Error('Function not implemented.');
}

