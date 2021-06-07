import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Assemble from 'src/app/shared/AllPojos/assemble';

@Injectable({
  providedIn: 'root',
})
export class AssemblyserviceService {
  private dbPath = '/AllAssembly';
  assemblyRef: AngularFireList<Assemble>;

  constructor(private db: AngularFireDatabase) {
    this.assemblyRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Assemble> {
    return this.assemblyRef;
  }
}
