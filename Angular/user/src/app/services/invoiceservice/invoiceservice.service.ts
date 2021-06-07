import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Invoice from 'src/app/shared/AllPojos/Invoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceserviceService {
  private dbPath = '/AllInvoices';
  invoiceref: AngularFireList<Invoice>;

  constructor(private db: AngularFireDatabase) {
    this.invoiceref = db.list(this.dbPath);
  }

  create(invoiceData: Invoice) {
    let key = this.invoiceref.push(invoiceData).key;
    invoiceData.invoiceid = key;
    return this.invoiceref.update(key, invoiceData);
  }
}
