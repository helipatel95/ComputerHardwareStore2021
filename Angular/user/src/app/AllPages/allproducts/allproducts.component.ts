import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AddtocartService } from 'src/app/services/addtocart/addtocart.service';
import { ProductService } from 'src/app/services/product/product.service';
import Product from 'src/app/shared/AllPojos/product';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss'],
})
export class AllproductsComponent implements OnInit {
  nameofFilter: string = '';
  idofFilter: string = '';
  productArray?: Product[] = [];
  cloneproductArray?: Product[] = [];
  displaychild = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public productservice: ProductService,
    public addtocartservice: AddtocartService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.nameofFilter = routeParams.get('name') || '';
    this.idofFilter = routeParams.get('id') || '';
    this.getAllProdducts(this.nameofFilter, this.idofFilter);
  }
  getAllProdducts(nameofFilter: string, idofFilter: string) {
    this.productArray = [];
    this.cloneproductArray = [];
    this.productservice
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.productArray = data.filter(
          (item) => item.isActive === true && item.isdeleted === false
        );
        if (nameofFilter == 'categorey') {
          this.productArray = this.productArray.filter(
            (item) => item.categoryId === idofFilter
          );
          this.cloneproductArray = Object.assign([], this.productArray);
        }
        if (nameofFilter == 'search') {
          this.productArray = this.productArray.filter((iteam) => {
            let samenumber: number = this.docheckstring(
              iteam.productName,
              idofFilter
            );

            if (samenumber == 1) {
              debugger;
              return true;
            }
          });
          this.cloneproductArray = Object.assign([], this.productArray);
        }
        if(nameofFilter == 'deal'){
          this.productArray = this.productArray.filter(
            (item) => item.discountId === idofFilter
          );
          this.cloneproductArray = Object.assign([], this.productArray);
        }
        this.displaychild = true;
      });
  }
  docheckstring(s1: string, s2: string): number {
    const copys1 = s1.replace(/\s/g, '').toLowerCase();
    const copys2 = s2.replace(/\s/g, '').toLowerCase();
    debugger;
    if (copys1.includes(copys2)) {
      debugger;
      return 1;
    } else {
      debugger;
      return 0;
    }
    // var longer = s1;
    // var shorter = s2;
    // if (s1.length < s2.length) {
    //   longer = s2;
    //   shorter = s1;
    // }
    // const longerLength: number = longer.length;
    // if (longerLength == 0) {
    //   return 1.0;
    // }
    // return (longerLength - this.editDistance(longer, shorter)) / longerLength;
  }
  editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  productsArrayChengeEvent(products: any) {
    this.productArray = products;
  }
  openProduct(id: string) {
    let url = 'Dashboard/Product/' + id;
    this.router.navigate([url]);
  }
  addtcart(product: Product) {
    this.addtocartservice.addproduct(product);
  }
  getpercentage(price: any, percentage: any) {
    const amount: any = (percentage / 100) * price;
    const finalprice: any = price - amount;
    return finalprice;
  }
}
