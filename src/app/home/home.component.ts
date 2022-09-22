import { Component, OnInit } from '@angular/core';
import { FireService } from "../service/fire.service";
import { FormGroup,FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
name = "GOWTHAM'S  EXCAL"
income= '0';
expense='0';
date:any;
incomeres:any;
expenseres:any;

excal!:Excal[];
currentIncome?:Excal;
currentIndex = -1;
currbal: any;
  constructor(private fireService:FireService){}

  ngOnInit(): void {
    this.retrieveData();
  }
  refresh(){
    window.location.reload();
  }
  createData(){
    let Record:any={};
    Record['income'] = this.income;
    Record['expense'] = this.expense;
    Record['date'] = this.date;
    Record['incomeres'] = this.incomeres;
    Record['expenseres'] = this.expenseres;
    this.fireService.create(Record).then(()=>{
      window.location.reload();

    })
  }
  refreshList(){
    this.currentIncome = undefined;
    this.currentIndex = -1;
    this.retrieveData();
  }

  retrieveData():void{
    this.fireService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({
          key:c.payload.key, ...c.payload.val()})
          )
        )
    ).subscribe(data =>{
      this.excal = data;
      // console.log(this.excal);
    })
  }
  setData(setincome:Excal,index:number){
    this.currentIncome = setincome;
    this.currentIndex  = index;
    // console.log(this.currentIndex)
  }
  removeAll(name:string){
    if(confirm("Are you sure?")){
      this.fireService.deleteAll().then(() =>
      this.refreshList()).catch(err => console.log(err));
      window.location.reload();
      }
    }
}

export interface Excal {
  date:any;
  income:number;
  expense:any;
  total:any;
}


