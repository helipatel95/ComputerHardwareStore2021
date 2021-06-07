import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductsService } from 'src/app/services/products/products.service';
import Category from 'src/app/Shared/AllPojos/category';
import Product from 'src/app/Shared/AllPojos/product';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  productid: string = '';
  productData: Product = new Product();
  productForm: FormGroup;
  submitted: boolean = false;
  categoryArray?: Category[];

  moreInfo: any;
  techInfo: any;
  imageInfo: any;
  dealInfo: any;
  manufactureInfo: any;
  productTagsInfo: any;
  returnInfo: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public categoriesService: CategoryService,
    public productservice: ProductsService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      categoryId: ['', Validators.required],
      productPrice: [
        '',
        [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
      ],
      produtBrand: ['', Validators.required],
      produtModelNo: ['', Validators.required],
      productcolor: ['', Validators.required],
    });
    this.getAllCategories();
    const routeParams = this.route.snapshot.paramMap;
    this.productid = routeParams.get('productid') || '';
    this.getproductData(this.productid);
  }

  get f() {
    return this.productForm.controls;
  }

  getAllCategories() {
    this.categoriesService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.categoryArray = data.filter((item) => item.isdeleted === false);
      });
  }

  Submitform() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    } else {
      this.addProductData(this.productForm.value);
    }
  }

  addProductData(productForm: Product) {
    let categoryname = this.categoryArray.filter(
      (item) => item.id === productForm.categoryId
    );
    Object.keys(this.productForm.value).forEach((key) => {
      this.productData[key] = this.productForm.get(key).value;
    });
    this.productData.categoryName = categoryname[0].categoryname;
    this.productData.moreInfo = this.moreInfo;
    this.productData.tecSpec = this.techInfo;
    this.productData.productImages = this.imageInfo;
    this.productData.manufactureInfo = this.manufactureInfo;
    this.productData.productTag = this.productTagsInfo;
    this.productData.returnPolicy = this.returnInfo;
    this.productData = this.setdealData(this.productData);
    console.log(this.productData);
    this.productservice
      .update(this.productData)
      .then((result) => {
        let url = '/Admin/Products';
        this.router.navigate([url], { replaceUrl: true });
      })
      .catch((err) => {});
  }
  setdealData(productData: Product): Product {
    productData.discountId = this.dealInfo.discountId;
    productData.discountName = this.dealInfo.discountName;
    productData.discountPercentage = this.dealInfo.discountPercentage;
    productData.startDate = this.dealInfo.startDate;
    productData.enddate = this.dealInfo.enddate;
    return productData;
  }

  getproductData(productid: string) {
    this.productservice
      .getSingleProductData(productid)
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        if (data) {
          this.productData = data.filter((item) => item.id === productid)[0];
          const {
            productName,
            productDescription,
            productPrice,
            categoryId,
            produtBrand,
            produtModelNo,
            productcolor,
          } = this.productData;
          this.productForm.patchValue({
            productName,
            productDescription,
            productPrice,
            categoryId,
            produtBrand,
            produtModelNo,
            productcolor,
          });
          this.moreInfo = this.productData.moreInfo;
          this.techInfo = this.productData.tecSpec;
          this.imageInfo = this.productData.productImages;
          this.returnInfo = this.productData.returnPolicy;
          this.manufactureInfo = this.productData.manufactureInfo;
          this.productTagsInfo = this.productData.productTag;
          this.dealInfo = {
            discountId: this.productData.discountId,
            discountName: this.productData.discountName,
            discountPercentage: this.productData.discountPercentage,
            enddate: this.productData.enddate,
            startDate: this.productData.startDate,
            productPrice: this.productData.productPrice,
          };
          debugger;
        }
      });
  }

  moreInfoChangedHandler(moreinfo: any) {
    this.moreInfo = moreinfo;
  }
  techInfoChangedHandler(techInfo: any) {
    this.techInfo = techInfo;
  }
  picInfoChangedHandler(imageInfo: any) {
    this.imageInfo = imageInfo;
  }
  dealInfoChangedHandler(dealInfo: any) {
    this.dealInfo = dealInfo;
  }
  manufactureInfoChangedHandler(manufactureInfo: any) {
    this.manufactureInfo = manufactureInfo;
  }
  returnInfoChangedHandler(returnInfo: any) {
    this.returnInfo = returnInfo;
  }
  producttagInfoChangedHandler(productTagInfo: any) {
    this.productTagsInfo = productTagInfo;
  }
}
