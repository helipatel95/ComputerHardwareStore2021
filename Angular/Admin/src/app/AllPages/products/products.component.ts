import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import Category from 'src/app/Shared/AllPojos/category';
import Product from 'src/app/Shared/AllPojos/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  productForm: FormGroup;
  submitted: boolean = false;

  displayedColumns: string[] = [
    'Sno',
    'Product Name',
    'Model No',
    'Price',
    'Categories',
    'Active',
    'Action',
  ];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filter: string;

  categoryArray?: Category[];
  productArry?: Product[];
  productData: Product;

  constructor(
    private fb: FormBuilder,
    public categoriesService: CategoryService,
    public productService: ProductsService,
    public router: Router
  ) {
    this.getAllCategories();
    this.getAllProducts();
    this.dataSource = new MatTableDataSource(this.productArry);
  }

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
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  togglechange(event, product: Product) {
    product.isActive = event.checked;
    this.productService.update(product).then(() => {});
  }
  editdata(product: Product) {
    let url = '/Admin/Productsdata/' + product.id;
    this.router.navigate([url]);
  }
  delete(product: Product) {
    product.isdeleted = true;
    product.isActive = false;
    this.productService
      .update(product)
      .then((result) => {})
      .catch((err) => {});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProducts() {
    this.productService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.productArry = data.filter((item) => item.isdeleted === false);
        this.dataSource.data = this.productArry;
      });
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

  get f() {
    return this.productForm.controls;
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
    let product = new Product(this.productForm.value);
    let categoryname = this.categoryArray.filter(
      (item) => item.id === productForm.categoryId
    );
    product.categoryName = categoryname[0].categoryname;
    this.productService.create(product).then(() => {
      this.productForm.reset();
      this.submitted = false;
    });
  }
}
