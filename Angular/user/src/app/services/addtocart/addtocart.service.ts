import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Cart from 'src/app/shared/AllPojos/Cart';
import product from 'src/app/shared/AllPojos/product';

@Injectable({
  providedIn: 'root',
})
export class AddtocartService {
  cartArray: Cart[] = [];
  constructor(private _snackBar: MatSnackBar) {}

  addproduct(product: product) {
    this.cartArray = JSON.parse(localStorage.getItem('cartdata'));
    if (this.cartArray == null || this.cartArray.length == 0) {
      debugger;
      this.cartArray = [];
    }

    const cartnewdata: Cart = new Cart();
    cartnewdata.qty = 1;
    cartnewdata.product = product;
    this.cartArray.push(cartnewdata);
    localStorage.setItem('cartdata', JSON.stringify(this.cartArray));
    this._snackBar.open('Product Added to Cart!!', 'Added', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2 * 1000,
    });
  }

  getAllCartData() {
    this.cartArray = JSON.parse(localStorage.getItem('cartdata'));
    if (this.cartArray == null || this.cartArray.length == 0) {
      debugger;
      this.cartArray = [];
    }
    return this.cartArray;
  }

  removeProduct(index: number) {
    this.cartArray = JSON.parse(localStorage.getItem('cartdata'));
    if (this.cartArray == null || this.cartArray.length == 0) {
      debugger;
      this.cartArray = [];
    }
    this.cartArray.splice(index, 1);
    localStorage.setItem('cartdata', JSON.stringify(this.cartArray));
    this._snackBar.open('Product Remove from Cart!!', 'Removed', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2 * 1000,
    });
  }

  clearCart() {
    localStorage.removeItem('cartdata');
  }
}
