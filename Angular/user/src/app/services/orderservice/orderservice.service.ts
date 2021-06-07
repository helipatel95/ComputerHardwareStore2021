import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Invoice from 'src/app/shared/AllPojos/Invoice';

@Injectable({
  providedIn: 'root',
})
export class OrderserviceService {
  private dbPath = '/AllInvoices';
  invoiceref: AngularFireList<Invoice>;
  constructor(private db: AngularFireDatabase) {
    this.invoiceref = db.list(this.dbPath);
  }
  getAll() {
    return this.invoiceref;
  }
}
