import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import Product from 'src/app/shared/AllPojos/product';

@Component({
  selector: 'app-filterpage',
  templateUrl: './filterpage.component.html',
  styleUrls: ['./filterpage.component.scss'],
})
export class FilterpageComponent implements OnInit {
  @Input() productsInfo: Product[];
  @Output() productArrayChange: EventEmitter<any> = new EventEmitter();
  cloneProductArray: Product[] = [];
  selectedbrandArray: any = [];
  allbarndArrayString: any = [];
  allBrandArray: any = [];
  selectedPrice = 0;

  constructor() {}

  ngOnInit(): void {
    this.cloneProductArray = Object.assign([], this.productsInfo);
    this.allbarndArrayString = this.productsInfo
      .map((item) => item.produtBrand)
      .filter((value, index, self) => self.indexOf(value) === index);
    this.allBrandArray = [];
    for (let index = 0; index < this.allbarndArrayString.length; index++) {
      const data = {
        produtBrand: this.allbarndArrayString[index],
        selected: false,
        id: index,
      };
      this.allBrandArray.push(data);
    }

    this.productArrayChange.emit(this.productsInfo);
  }

  formatLabel(value: number) {
    return value + 'Cad';
  }

  someMethod() {
    this.refreshBrand();
  }

  updateBrandArray(id) {
    this.refreshBrand();
  }

  refreshBrand() {
    this.selectedbrandArray = this.allBrandArray.filter(
      (item) => item.selected === true
    );
    this.selectedbrandArray = this.selectedbrandArray
      .map((item) => item.produtBrand)
      .filter((value, index, self) => self.indexOf(value) === index);
    this.productsInfo = [];

    this.productsInfo = Object.assign([], this.cloneProductArray);
    const barndarray = this.selectedbrandArray;
    if (barndarray.length > 0) {
      this.productsInfo = this.productsInfo.filter((itm) => {
        if (barndarray.indexOf(itm.produtBrand) > -1) {
          return itm;
        }
      });
    }

    this.filterPriceArray();
    //this.productArrayChange.emit(this.productsInfo);
  }
  filterPriceArray() {
    if (this.selectedPrice > 0) {
      const price = this.selectedPrice;
      this.productsInfo = this.productsInfo.filter((itm) => {
        if (itm.productPrice <= price) {
          return itm;
        }
      });
    }
   
    this.productArrayChange.emit(this.productsInfo);
  }
}
