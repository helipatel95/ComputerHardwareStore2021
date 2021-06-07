import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DealService } from 'src/app/services/deal/deal.service';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';
import Category from 'src/app/shared/AllPojos/category';
import { Router } from '@angular/router';
import User from 'src/app/shared/AllPojos/Userpojo';
import { AuthService } from 'src/app/services/auth/auth.service';
import Deal from 'src/app/shared/AllPojos/deal';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  dealArray: any = [];
  categoryArray: any = [];
  userdata: User = new User();

  productsList: any = [
    { product: 'Deals', icons: 'fa fa-laptop fa-5x' },
    { product: 'Ice Cream + Frozen', icons: 'fa fa-television fa-5x' },
    { product: 'American', icons: 'fa fa-desktop fa-5x' },
    { product: 'Asian', icons: 'fa fa-keyboard-o fa-5x' },
    { product: 'Japanese', icons: 'fa fa-television fa-5x' },
    { product: 'Coffee and Tea', icons: 'fa fa-television fa-5x' },
    { product: 'Bakery', icons: 'fa fa-television fa-5x' },
    { product: 'Sandwich', icons: 'fa fa-television fa-5x' },
    { product: 'Sushi', icons: 'fa fa-television fa-5x' },
    { product: 'italian', icons: 'fa fa-television fa-5x' },
    { product: 'Comfort Food', icons: 'fa fa-television fa-5x' },
    { product: 'Deserts', icons: 'fa fa-television fa-5x' },
  ];
  product: any = document.getElementsByClassName('product');
  product_page: any = Math.ceil(this.product.length / 4);
  l: any = 0;
  movePer: any = 14.0;
  maxMove: any = 203;
  todayBestDeals = [
    {
      productDiscription:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost: '656',
    },
    {
      productDiscription:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost: '656',
    },
    {
      productDiscription:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost: '656',
    },
    {
      productDiscription:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost: '656',
    },
  ];
  recentViews = [
    {
      productDiscription:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost: '656',
    },
    {
      productDiscription:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost: '656',
    },
    {
      productDiscription:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost: '656',
    },
  ];
  corousal = [
    {
      heading: 'Update home Office',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A similique maxime modi?',
      image: '../../../assets/images/computer.png',
      fromDate: '20/20/2021',
      toDate: '25/20/2021',
      active: true,
    },
    {
      heading: 'Update home Office',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A similique maxime modi?',
      image: '../../../assets/images/computer.png',
      fromDate: '20/20/2021',
      toDate: '25/20/2021',
      active: false,
    },
    {
      heading: 'Update home Office',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. A similique maxime modi?',
      image: '../../../assets/images/computer.png',
      fromDate: '20/20/2021',
      toDate: '25/20/2021',
      active: false,
    },
  ];
  constructor(
    public dealService: DealService,
    public catregoryservice: CategoryService,
    public router: Router,
    public authservice: AuthService
  ) {
    this.getAllData();
  }

  getAllData() {
    this.getdealsdata();
    this.getAllcategories();
    this.getsimmilarProducts();
    this.userdata = JSON.parse(localStorage.getItem('userdata'));
    
   

    // Object.keys(data).forEach((key) => {
    //   this.userdata[key] = data.key;
    // });
  }

  ngOnInit(): void {}

  getdealsdata() {
    this.dealService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.dealArray = data.filter(
          (item) => item.isdeleted === false && item.isActive === true
        );
        console.log(this.dealArray);
      });
  }

  gotoproductspage(deal: Deal){
    let url = 'Dashboard/allproducts/deal/' + deal.id;
    this.router.navigate([url]);
  }
  getAllcategories() {
    this.catregoryservice
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.categoryArray = data.filter(
          (item) => item.isdeleted === false && item.isActive === true
        );
      });
  }
  getsimmilarProducts() {}

  gotoAllProducts(category: Category) {
    let url = 'Dashboard/allproducts/categorey/' + category.id;
    this.router.navigate([url]);
  }

  right_mover() {
    this.l = this.l + this.movePer;
    if (this.product == 1) {
      this.l = 0;
    }
    for (const i of this.product) {
      if (this.l > this.maxMove) {
        this.l = this.l - this.movePer;
      }
      i.style.left = '-' + this.l + '%';
    }
  }

  left_mover() {
    this.l = this.l - this.movePer;
    if (this.l <= 0) {
      this.l = 0;
    }
    for (const i of this.product) {
      if (this.product_page < 1) {
        i.style.left = '-' + this.l + '%';
      }
    }
  }
}
