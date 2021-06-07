import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Deal from 'src/app/shared/AllPojos/deal';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  private dbPath = '/AllDeals';
  dealsRef: AngularFireList<Deal>;
  constructor(private db: AngularFireDatabase) {
    this.dealsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Deal> {
    return this.dealsRef;
  }
}
