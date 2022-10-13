import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Excal } from "../excal.model";
import { AuthService } from "../service/auth.service";
@Injectable({
  providedIn: 'root'
})
export class FireService {
  user!:Observable<any>;
  private model = `/excal`;
//  excalRef!: AngularFireList<Excal>;
  excalRef: any;

  list: any;

  constructor(private afd: AngularFireDatabase,
    private authservice:AuthService) {
    this.excalRef = afd.list(this.model+'/'+this.authservice.username)
  }

  getAll(): AngularFireList<any> { 
    return this.excalRef;
  }
  getCurrentData(): Observable<Excal[]> {
    this.list = this.afd.list('excal'+'/'+this.authservice.username).valueChanges()
    console.log(this.list);
    return this.list;

  }
  create(excal: Excal): any {
    return this.excalRef.push(excal);
  }

  update(key: string, value: any): Promise<void> {
    return this.excalRef.update(key, value);
  }
  deleteAll(): Promise<void> {
    return this.excalRef.remove();
  }
}
