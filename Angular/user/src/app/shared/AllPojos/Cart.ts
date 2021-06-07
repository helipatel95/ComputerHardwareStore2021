import Product from './product';

export default class Cart {
  qty?: number = 1;
  product?: Product = new Product();

  public constructor(init?: Partial<Cart>) {
    Object.assign(this, init);
  }
}
