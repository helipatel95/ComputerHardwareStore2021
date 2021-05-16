import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Deal from 'src/app/Shared/AllPojos/deal';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  private dbPath = '/AllDeals';
  dealsRef: AngularFireList<Deal>;
  constructor(
    private db: AngularFireDatabase,
    public authservice: AuthService
  ) {
    this.dealsRef = db.list(this.dbPath);
  }

  create(deal: Deal): any {
    let key = this.dealsRef.push(deal).key;
    deal.id = key;
    return this.dealsRef.update(key, deal);
  }

  getAll(): AngularFireList<Deal> {
    return this.dealsRef;
  }
  update(deal: Deal): any {
    this.dealsRef = this.db.list(this.dbPath);
    return this.dealsRef.update(deal.id, deal);
  }
}
