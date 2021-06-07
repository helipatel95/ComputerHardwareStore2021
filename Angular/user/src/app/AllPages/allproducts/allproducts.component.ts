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
        if (nameofFilter == 'categorey') {
          this.productArray = data.filter(
            (item) =>
              item.isActive === true &&
              item.isdeleted === false &&
              item.categoryId === idofFilter
          );
          this.cloneproductArray = data.filter(
            (item) =>
              item.isActive === true &&
              item.isdeleted === false &&
              item.categoryId === idofFilter
          );
        }
        this.displaychild = true;
      });
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
