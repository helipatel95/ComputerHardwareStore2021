export default class Product {
  id?: string = '';
  productName?: string = '';
  productDescription?: string = '';
  categoryName?: string = '';
  categoryId?: string = '';
  produtBrand?: string = '';
  produtModelNo?: string = '';
  productcolor: string = '';
  productPrice: number = 0;
  isdeleted?: boolean = false;
  isActive?: boolean = false;
  moreInfo?: any = 0;
  productImages?: any = 0;
  manufactureInfo?: any = 0;
  returnPolicy?: any = 0;
  tecSpec?: any = 0;
  productTag?: any = 0;
  discountId?: string = '';
  discountName?: string = '';
  discountPercentage?: number = 0;
  startDate?: string = '';
  enddate?: string = '';
  createBy: string = '';

  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
