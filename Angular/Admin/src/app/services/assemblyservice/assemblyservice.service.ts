import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Assemble from 'src/app/Shared/AllPojos/assemble';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssemblyserviceService {
  private dbPath = '/AllAssembly';
  assemblyRef: AngularFireList<Assemble>;
  constructor(
    private db: AngularFireDatabase,
    public authservice: AuthService
  ) {
    this.assemblyRef = db.list(this.dbPath);
  }

  create(deal: Assemble): any {
    let key = this.assemblyRef.push(deal).key;
    deal.id = key;
    return this.assemblyRef.update(key, deal);
  }

  getAll(): AngularFireList<Assemble> {
    return this.assemblyRef;
  }
  update(assembly: Assemble): any {
    this.assemblyRef = this.db.list(this.dbPath);
    return this.assemblyRef.update(assembly.id, assembly);
  }
}
