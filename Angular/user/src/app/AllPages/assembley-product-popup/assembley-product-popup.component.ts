import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Product from 'src/app/shared/AllPojos/product';

@Component({
  selector: 'app-assembley-product-popup',
  templateUrl: './assembley-product-popup.component.html',
  styleUrls: ['./assembley-product-popup.component.scss'],
})
export class AssembleyProductPopupComponent implements OnInit {
  bigimageDoenloadedurl: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public productData: Product) {}

  ngOnInit(): void {
    this.bigimageDoenloadedurl = this.productData.productImages[0];
  }
  imageClick(url) {
    this.bigimageDoenloadedurl = url;
  }

  getpercentage(price: any, percentage: any) {
    const amount: any = (percentage / 100) * price;
    const finalprice: any = price - amount;

    return finalprice;
  }
}
