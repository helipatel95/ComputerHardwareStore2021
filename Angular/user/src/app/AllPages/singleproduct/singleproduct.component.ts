import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AddtocartService } from 'src/app/services/addtocart/addtocart.service';
import { ProductService } from 'src/app/services/product/product.service';
import Product from 'src/app/shared/AllPojos/product';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss'],
})
export class SingleproductComponent implements OnInit {
  productData: Product = null;
  productid: string = '';

  bigimageDoenloadedurl: string = '';

  constructor(
    public productservices: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public addtocartservice: AddtocartService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.productid = routeParams.get('id') || '';
    this.getSingleProduct(this.productid);
  }

  getSingleProduct(productid: string) {
    this.productservices
      .getSingleProductData(productid)
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        if (data) {
          this.productData = data.filter((item) => item.id === productid)[0];
          this.bigimageDoenloadedurl = this.productData.productImages[0];
        }
      });
  }

  getpercentage(price: any, percentage: any) {
    const amount: any = (percentage / 100) * price;
    const finalprice: any = price - amount;

    return finalprice;
  }
  imageClick(url: string) {
    this.bigimageDoenloadedurl = url;
  }
  addtocart(productdat: Product) {
    this.addtocartservice.addproduct(productdat);
  }
}
