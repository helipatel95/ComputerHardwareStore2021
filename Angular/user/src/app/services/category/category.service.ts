import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Category from 'src/app/shared/AllPojos/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private dbPath = '/allcategories';

  tutorialsRef: AngularFireList<Category>;
  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Category> {
    return this.tutorialsRef;
  }
}
