import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userid!: string;
  public username!: any;
  user$!: Observable<any>;
  userData: any;
  authState: any = null;
  constructor(public afs: AngularFirestore,
    public afauth: AngularFireAuth,
    public router: Router) {
    this.afauth.authState.subscribe((auth) => {
      this.authState = auth;
    })
  }

  registerwithEmail(email: string, password: string,name:any) {
    return this.afauth.createUserWithEmailAndPassword(email, password).then((user) => {
      user.user?.updateProfile({displayName:name})
      this.authState = user;
      this.router.navigate(['login'])
    }).catch(error => {
        window.alert(error)
    })
  }


  loginWithEmail(email: string, password: string) {
    return this.afauth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.authState = credential.user?.displayName
        this.username = credential.user?.displayName
        this.router.navigate(['home'])
        console.log(credential);

      })
      .catch(error => {
        console.log(error)
        window.alert(error)
      });
  }

}
