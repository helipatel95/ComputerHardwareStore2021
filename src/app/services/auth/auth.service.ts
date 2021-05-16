import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Signup } from 'src/app/Shared/AllPojos/Signup';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dbPath = '/AllAdmins';

  userref: AngularFireList<any>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.userref = db.list(this.dbPath);
  }

  SignUp(userpojo: Signup): any {
    return this.afAuth.createUserWithEmailAndPassword(
      userpojo.email,
      userpojo.password
    );
  }

  insertUserdata(userpojo: Signup): any {
    return this.userref.update(userpojo.userid, userpojo);
  }

  dologin(loginData: any) {
    return this.afAuth.signInWithEmailAndPassword(
      loginData.email,
      loginData.password
    );
  }
}
