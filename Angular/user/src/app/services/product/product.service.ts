import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Product from 'src/app/shared/AllPojos/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dbPath = '/AllProducts';
  productref: AngularFireList<Product>;
  constructor(private db: AngularFireDatabase) {
    this.productref = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Product> {
    return this.productref;
  }
  getSingleProductData(productid: string) {
    console.log(this.dbPath + '/' + productid);
    let productref = this.db.list(this.dbPath + '/' + productid);
    return this.productref;
  }
}
