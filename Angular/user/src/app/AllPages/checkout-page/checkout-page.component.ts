import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddtocartService } from 'src/app/services/addtocart/addtocart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InvoiceserviceService } from 'src/app/services/invoiceservice/invoiceservice.service';
import Cart from 'src/app/shared/AllPojos/Cart';
import Invoice from 'src/app/shared/AllPojos/Invoice';
import User from 'src/app/shared/AllPojos/Userpojo';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  cartArray: Cart[] = [];
  totalprice: number = 0;
  totalqty: number = 0;
  billingForm: FormGroup;
  shippingform: FormGroup;
  submitted: boolean = false;
  loginuser: User = new User();
  invoicedate = new Date();
  genratedInvoice: Invoice = new Invoice();

  constructor(
    public cartdataservice: AddtocartService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authservice: AuthService,
    public invoiceservice: InvoiceserviceService,
    public addtocart: AddtocartService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checklogin();
    this.billingForm = this.fb.group({
      streetnamebilling: ['', Validators.required],
      apartmentbilling: ['', Validators.required],
      postalcodebilling: ['', Validators.required],
      citybilling: ['', Validators.required],
      provicebilling: ['', Validators.required],
    });
    this.shippingform = this.fb.group({
      firstnamedelivery: ['', Validators.required],
      lastnamedelivery: ['', Validators.required],
      phonedelivery: ['', Validators.required],
      streetnamedelivery: ['', Validators.required],
      apartmentdelivery: ['', Validators.required],
      postalcodedelivery: ['', Validators.required],
      citydelivery: ['', Validators.required],
      provicedelivery: ['', Validators.required],
    });
    this.cartArray = this.cartdataservice.getAllCartData();
    this.calculatetotal();
  }
  checklogin() {
    if (
      this.authservice.getcurrentuser() &&
      this.authservice.getcurrentuser() != 'null'
    ) {
      this.loginuser = JSON.parse(localStorage.getItem('userdata'));
    } else {
      this.router.navigate(['/Auth'], { replaceUrl: true });
    }
  }

  get f() {
    return this.billingForm.controls;
  }

  get g() {
    return this.shippingform.controls;
  }

  getpercentage(price: any, percentage: any) {
    const amount: any = (percentage / 100) * price;
    const finalprice: any = price - amount;

    return finalprice;
  }

  checkout() {
    this.submitted = true;
    if (this.billingForm.invalid) {
      return;
    }
    if (this.shippingform.invalid) {
      return;
    } else {
      this.genratedInvoice.invoicedate = this.invoicedate;
      this.genratedInvoice.userid = this.loginuser.userid;
      this.genratedInvoice.userfirstname = this.loginuser.firstname;
      this.genratedInvoice.userlastname = this.loginuser.lastname;
      this.genratedInvoice.userEmail = this.loginuser.email;
      this.genratedInvoice.invoiceamount = this.totalprice;
      this.genratedInvoice.allproducts = this.cartArray;
      this.genratedInvoice.billingAddress = this.billingForm.value;
      this.genratedInvoice.deliveryAddress = this.shippingform.value;
      this.dogenrateInvoive(this.genratedInvoice);
    }
  }
  dogenrateInvoive(genratedInvoice: Invoice) {
    this.invoiceservice.create(genratedInvoice).then((data) => {
      this.addtocart.clearCart();
      this._snackBar.open('Invoice genrated!!', 'Genrated', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2 * 1000,
      });
      this.router.navigate(['/Dashboard'], { replaceUrl: true });
    });
  }

  calculatetotal() {
    for (let index = 0; index < this.cartArray.length; index++) {
      const discound: number =
        +this.cartArray[index].product.discountPercentage;
      const productPrice: number = +this.cartArray[index].product.productPrice;
      debugger;
      if (discound === 0) {
        this.totalprice = this.totalprice + productPrice;
        debugger;
      } else {
        this.totalprice =
          this.totalprice +
          this.getpercentage(
            this.cartArray[index].product.productPrice,
            this.cartArray[index].product.discountPercentage
          );
      }
    }
  }
}
