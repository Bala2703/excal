import { Component, OnInit } from '@angular/core';
import { FireService } from "../service/fire.service";
import { map } from 'rxjs';

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
incomeres='--';
expenseres='--';

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
      var bal = 0;
      for(var i=0;i<this.excal.length;i++){
        const income = Number(data[i].income)
        const expense = Number(data[i].expense);
         bal = bal + income - expense;
        this.currbal = bal;
      }
    })
  }
}

export interface Excal {
  date:any;
  income:number;
  expense:any;
  total:any;
}


