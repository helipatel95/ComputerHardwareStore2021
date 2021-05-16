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
    console.log(this.productData);
    this.productservice
      .update(this.productData)
      .then((result) => {
        let url = '/Admin/Products';
        this.router.navigate([url], { replaceUrl: true });
      })
      .catch((err) => {});
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
        }
      });
  }

  moreInfoChangedHandler(moreinfo: any) {
    this.moreInfo = moreinfo;
  }
  techInfoChangedHandler(techInfo: any) {
    this.techInfo = techInfo;
  }
}
