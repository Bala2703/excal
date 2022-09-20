import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Excal } from "../excal.model";

@Injectable({
  providedIn: 'root'
})
export class FireService {
  private model = '/excal';
  excalRef!:AngularFireList<Excal>;

  constructor(private afd:AngularFireDatabase) {
    this.excalRef = afd.list(this.model)
   }

   create(excal:Excal):any{
    return this.excalRef.push(excal);
   }
}
