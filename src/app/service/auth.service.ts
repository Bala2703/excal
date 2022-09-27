import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { GoogleAuthProvider } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any;
  constructor(public afs:AngularFirestore,
              public afauth: AngularFireAuth,
              public router: Router){ }

    googleAuth(){
      return this.authLogin(new GoogleAuthProvider()).then((res:any)=> {
        this.router.navigate(['home']);
      });
    }
    authLogin(provider:any){
      return this.afauth.signInWithPopup(provider).then((
        result
      )=>{
        this.router.navigate(['home']);
      })
      .catch((error)=>{
        window.alert(error);
      })
    }

            
}
