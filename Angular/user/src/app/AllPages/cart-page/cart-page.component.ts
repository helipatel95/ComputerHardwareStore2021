import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddtocartService } from 'src/app/services/addtocart/addtocart.service';
import Cart from 'src/app/shared/AllPojos/Cart';
import Product from 'src/app/shared/AllPojos/product';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartArray: Cart[] = [];
  totalprice: number = 0;
  totalqty: number = 0;

  constructor(
    public cartdataservice: AddtocartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cartArray = this.cartdataservice.getAllCartData();
    this.calculatetotal();
  }

  addproduct(product: Product) {
    this.cartdataservice.addproduct(product);
    this.cartArray = [];
    this.cartArray = this.cartdataservice.getAllCartData();
    this.calculatetotal();
  }
  removeproduct(index: number) {
    this.cartdataservice.removeProduct(index);
    this.cartArray = [];
    this.cartArray = this.cartdataservice.getAllCartData();
    this.calculatetotal();
  }
  calculatetotal() {
    this.totalprice = 0;
    for (let index = 0; index < this.cartArray.length; index++) {
      const discound: number =
        +this.cartArray[index].product.discountPercentage;
      const productPrice: number = +this.cartArray[index].product.productPrice;
      debugger;
      if (discound === 0) {
        this.totalprice = this.totalprice + productPrice;
        debugger;
      } else {
        this.totalprice =
          this.totalprice +
          this.getpercentage(
            this.cartArray[index].product.productPrice,
            this.cartArray[index].product.discountPercentage
          );
      }
    }
  }
  getpercentage(price: any, percentage: any) {
    const amount: any = (percentage / 100) * price;
    const finalprice: any = price - amount;

    return finalprice;
  }

  proceedtochekout() {
    let url = 'Dashboard/Checkout';
    this.router.navigate([url]);
  }
}
