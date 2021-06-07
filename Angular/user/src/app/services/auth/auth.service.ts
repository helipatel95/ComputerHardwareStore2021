import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import User from 'src/app/shared/AllPojos/Userpojo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dbPath = '/AllUsers';

  userref: AngularFireList<any>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.userref = db.list(this.dbPath);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
       
        console.log(user.uid);
        localStorage.setItem('user', user.uid);
        this.setUserdata();
      } else {
       
        localStorage.setItem('user', null);
        localStorage.setItem('userdata', null);
      }
    });
  }

  setUserdata() {
    this.userref
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        const userdata = data.filter(
          (iteam) => iteam.userid === this.getcurrentuser()
        )[0];
        userdata.password = 'xxxxxxxxxxxx';
        localStorage.setItem('userdata', JSON.stringify(userdata));
      });
  }

  SignUp(userpojo: User): any {
    return this.afAuth.createUserWithEmailAndPassword(
      userpojo.email,
      userpojo.password
    );
  }

  insertUserdata(userpojo: User): any {
    return this.userref.update(userpojo.userid, userpojo);
  }

  dologin(loginData: any) {
    return this.afAuth.signInWithEmailAndPassword(
      loginData.email,
      loginData.password
    );
  }

  dologut() {
    return this.afAuth.signOut();
  }

  getcurrentuser() {
    
    var k = localStorage.getItem('user');
    return localStorage.getItem('user');
  }

  getCurrentUserdata() {
    const Userdata: User = JSON.parse(localStorage.getItem('userdata'));
    return Userdata;
  }
}
