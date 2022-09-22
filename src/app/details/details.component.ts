import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Excal } from '../excal.model';
import { FireService } from "../service/fire.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  excal!:Excal[];
currentIncome?:Excal;
currentIndex = -1;
curr : any;
  constructor(private fireService : FireService) { }

  ngOnInit(): void {
    this.retrieveData();

  }
  retrieveData():void{
    this.fireService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({
          key:c.payload.key, ...c.payload.val()})
          )
        )
    ).subscribe((data: Excal[]) =>{
      this.excal = data;
    })
  }
  setData(setincome:Excal,index:number){
    this.currentIncome = setincome;
    this.currentIndex  = index;
    this.curr = this.fireService.getCurr(this.currentIndex).subscribe(data =>
      {
        console.log(data)
    } ) 
  }
  refreshList(){
    this.currentIncome = undefined;
    this.currentIndex = -1;
    this.retrieveData();
  }
  removeAll(){
    if(confirm("Are you sure?")){
      this.fireService.deleteAll().then(() =>
      this.refreshList()).catch(err => console.log(err));
      window.location.reload();
      }
    }
    refresh(){
      window.location.reload();
    }
  currentData(){
    // this.fireService.getAll(this.)
  }
}
