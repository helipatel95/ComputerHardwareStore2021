import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderserviceService } from 'src/app/services/orderservice/orderservice.service';
import Invoice from 'src/app/shared/AllPojos/Invoice';
import User from 'src/app/shared/AllPojos/Userpojo';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss'],
})
export class OrderhistoryComponent implements OnInit {
  invoiceArray: Invoice[] = [];
  loginuser: User = new User();
  constructor(
    public authservice: AuthService,
    private router: Router,
    private orderhistoryservice: OrderserviceService
  ) {}

  ngOnInit(): void {
    this.checklogin();
  }
  checklogin() {
    if (
      this.authservice.getcurrentuser() &&
      this.authservice.getcurrentuser() != 'null'
    ) {
      this.loginuser = JSON.parse(localStorage.getItem('userdata'));
      this.getAllInvoices();
    } else {
      this.router.navigate(['/Auth'], { replaceUrl: true });
    }
  }
  getpercentage(price: any, percentage: any) {
    const amount: any = (percentage / 100) * price;
    const finalprice: any = price - amount;
    return finalprice;
  }
  getAllInvoices() {
    this.orderhistoryservice
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        if (data) {
          this.invoiceArray = data.filter(
            (item) => item.userid === this.loginuser.userid
          );
          debugger;
        }
      });
  }
}
