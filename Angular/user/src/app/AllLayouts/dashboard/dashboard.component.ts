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
  userdara: User = new User();
  constructor(
    public catregoryservice: CategoryService,
    public router: Router,
    public authservice: AuthService
  ) {
    this.userdara = this.authservice.getCurrentUserdata();
    this.getAllCategories();
  }

  ngOnInit(): void {
    this.userdara = JSON.parse(localStorage.getItem('userdata'));
    console.log(this.userdara);
  }

  dologout() {
    this.authservice.dologut();
    localStorage.clear();
    let url = 'Auth';
    this.router.navigate([url], { replaceUrl: true });
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
