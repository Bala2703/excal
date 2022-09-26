import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { map, Observable } from 'rxjs';
import { Excal } from "../excal.model";

@Injectable({
  providedIn: 'root'
})
export class FireService {
  private model = '/excal';
  excalRef!: AngularFireList<Excal>;
  list: any;

  constructor(private afd: AngularFireDatabase) {
    this.excalRef = afd.list(this.model)
  }

  getAll(): AngularFireList<Excal> {
    return this.excalRef;
  }
  getCurrentData(): Observable<Excal[]> {
    this.list = this.afd.list("excal").valueChanges()
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
