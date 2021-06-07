import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AddtocartService } from 'src/app/services/addtocart/addtocart.service';
import { AssemblyserviceService } from 'src/app/services/assemblyservice/assemblyservice.service';
import { ProductService } from 'src/app/services/product/product.service';
import Assemble from 'src/app/shared/AllPojos/assemble';
import Category from 'src/app/shared/AllPojos/category';
import Product from 'src/app/shared/AllPojos/product';
import { AssembleyProductPopupComponent } from '../assembley-product-popup/assembley-product-popup.component';

@Component({
  selector: 'app-assembly-selection',
  templateUrl: './assembly-selection.component.html',
  styleUrls: ['./assembly-selection.component.scss'],
})
export class AssemblySelectionComponent implements OnInit {
  assemblyId: string = '';
  assemblyData: Assemble = null;
  selectedCategorieid: string = '';
  selectedCategoriename: string = '';
  productDisplayArray: Product[] = [];
  allProductsArray: Product[] = [];
  allSelectedData: any = {};
  selectedProduct: Product = new Product();
  categorielength: number = 0;
  advisorArray: string[] = [];

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    public assemblyservices: AssemblyserviceService,
    public productservice: ProductService,
    public dialog: MatDialog,
    public addtocartservice: AddtocartService
  ) {}

  ngOnInit(): void {
    const routeParams = this.activatedroute.snapshot.paramMap;
    this.assemblyId = routeParams.get('id') || '';
    const advisor = JSON.parse(localStorage.getItem('adviser'));
    if (advisor) {
      this.advisorArray = advisor;
    }
    this.getAllProducts();
  }

  getAllProducts() {
    this.productservice
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.allProductsArray = data.filter(
          (item) => item.isActive === true && item.isdeleted === false
        );
        if (this.advisorArray.length > 0) {
          const allproducts: Product[] = [];
          for (let index = 0; index < this.allProductsArray.length; index++) {
            const producttags = this.allProductsArray[index].productTag;
            if (producttags != 0) {
              let same = producttags.filter((value) =>
                this.advisorArray.includes(value)
              );
              debugger;
              if (same.length > 0) {
                this.productDisplayArray.push(this.allProductsArray[index]);
              }
            }
          }
          this.allProductsArray = Object.assign([], this.productDisplayArray);
        } else {
          this.productDisplayArray = Object.assign([], this.allProductsArray);
        }
        this.getAssemblyData(this.assemblyId);
      });
  }

  getpercentage(price: any, percentage: any) {
    const amount: any = (percentage / 100) * price;
    const finalprice: any = price - amount;
    return finalprice;
  }

  openproductPopup(product: Product) {
    const dialogRef = this.dialog.open(AssembleyProductPopupComponent, {
      data: product,
    });
  }

  getAssemblyData(assemblyId: string) {
    this.assemblyservices
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.assemblyData = data.filter(
          (item) =>
            item.isdeleted === false &&
            item.isActive === true &&
            item.id === assemblyId
        )[0];
        this.selectedCategorieid = this.assemblyData.allcategories[0].id;
        this.selectedCategoriename =
          this.assemblyData.allcategories[0].categoryname;
        this.filterdisplayArray();
      });
  }

  filterdisplayArray() {
    this.productDisplayArray = [];
    this.productDisplayArray = Object.assign([], this.allProductsArray);

    this.productDisplayArray = this.productDisplayArray.filter(
      (item) => item.categoryId === this.selectedCategorieid
    );
    if (this.allSelectedData[this.selectedCategoriename]) {
      this.selectedProduct = this.productDisplayArray.filter(
        (item) =>
          item.id === this.allSelectedData[this.selectedCategoriename].id
      )[0];
    } else {
      this.selectedProduct = new Product();
    }
  }

  selectcategorie(data: Category) {
    this.selectedCategorieid = data.id;
    this.selectedCategoriename = data.categoryname;
    this.filterdisplayArray();
  }

  selectProduct(product: Product) {
    if (this.allSelectedData[this.selectedCategoriename]) {
      this.allSelectedData[this.selectedCategoriename] = product;
    } else {
      this.categorielength = this.categorielength + 1;
      this.allSelectedData[this.selectedCategoriename] = product;
    }
    this.filterdisplayArray();
    debugger;
  }

  addtocart() {
    const allproducts: any = [];
    Object.keys(this.allSelectedData).some((key) => {
      allproducts.push(this.allSelectedData[key]);
    });
    for (let index = 0; index < allproducts.length; index++) {
      this.addtocartservice.addproduct(allproducts[index]);
    }
    let url = 'Dashboard/Cart';
    this.router.navigate([url]);
  }
}
