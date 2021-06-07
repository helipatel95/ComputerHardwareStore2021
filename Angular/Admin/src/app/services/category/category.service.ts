import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Category from 'src/app/Shared/AllPojos/category';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  private dbPath = '/allcategories';

  tutorialsRef: AngularFireList<Category>;

  constructor(
    private db: AngularFireDatabase,
    public authservice: AuthService
  ) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Category> {
    return this.tutorialsRef;
  }

  create(category: Category): any {
    category.cretedby = this.authservice.getcurrentuser();
    let key = this.tutorialsRef.push(category).key;
    category.id = key;
    return this.tutorialsRef.update(key, category);
  }

  update(category: Category): any {
    return this.tutorialsRef.update(category.id, category);
  }
}
