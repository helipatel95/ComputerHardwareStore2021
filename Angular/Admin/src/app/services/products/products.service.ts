import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import Product from 'src/app/Shared/AllPojos/product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private dbPath = '/AllProducts';
  productref: AngularFireList<Product>;

  constructor(
    private db: AngularFireDatabase,
    public authservice: AuthService
  ) {
    this.productref = db.list(this.dbPath);
  }

  create(productData: Product) {
    console.log(productData.manufactureInfo);
    productData.createBy = this.authservice.getcurrentuser();
    let key = this.productref.push(productData).key;
    productData.id = key;
    return this.productref.update(key, productData);
  }

  getAll(): AngularFireList<Product> {
    return this.productref;
  }

  update(product: Product): any {
    this.productref = this.db.list(this.dbPath);
    return this.productref.update(product.id, product);
  }

  getSingleProductData(productid: string): AngularFireList<Product> {
    console.log(this.dbPath + '/' + productid);
    let productref = this.db.list(this.dbPath + '/' + productid);
    return this.productref;
  }
}
