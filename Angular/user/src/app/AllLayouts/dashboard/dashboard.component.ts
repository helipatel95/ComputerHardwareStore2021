import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import Category from 'src/app/shared/AllPojos/category';
import User from 'src/app/shared/AllPojos/Userpojo';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  categoryArray: any = [];
  userdara: User = null;
  searchtext: string = '';
  constructor(
    public catregoryservice: CategoryService,
    public router: Router,
    public authservice: AuthService
  ) {
    this.getAllCategories();
  }

  ngOnInit(): void {
    debugger;
    setTimeout(() => {
      this.userdara = JSON.parse(localStorage.getItem('userdata'));
    }, 500);

    console.log(this.userdara);
  }

  dologout() {
    this.authservice.dologut();
    localStorage.clear();
    let url = 'Auth/login';
    this.router.navigate([url], { replaceUrl: true });
  }
  gotocartpage() {
    let url = 'Dashboard/Cart';
    this.router.navigate([url]);
  }

  gotocategory(category: Category) {
    let url = 'Dashboard/allproducts/categorey/' + category.id;
    this.router.navigate([url]);
  }

  gotoassembly() {
    let url = 'Dashboard/Listofassembly';
    this.router.navigate([url]);
  }
  gotoOrderhistory() {
    let url = 'Dashboard/Orderhistory';
    this.router.navigate([url]);
  }

  searchPage() {
    if (this.searchtext) {
      let url = 'Dashboard/allproducts/search/' + this.searchtext;
      this.router.navigate([url]);
    }
  }
  aboutus() {
    let url = 'Dashboard/Aboutus';
    this.router.navigate([url]);
  }

  getAllCategories() {
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
}
