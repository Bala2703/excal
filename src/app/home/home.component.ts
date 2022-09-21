import { Component, OnInit } from '@angular/core';
import { FireService } from "../service/fire.service";
import { FormGroup,FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

income: any;
expense:any;
date:any;

excal!:Excal[];
currentIncome?:Excal;
currentIndex = -1;
html: any;

dataSource = new MatTableDataSource<Excal>();
displayedColumns: any = ['i', 'income', 'NAME', 'START_TIME' , "TIME" , "ENTRY" , "TOTAL_HOUR"];
  constructor(private fireService:FireService){}

  ngOnInit(): void {
    this.retrieveData();
  }

  createData(){
    let Record:any={};
    Record['income'] = this.income;
    Record['expense'] = this.expense;
    Record['date'] = this.date;
    this.fireService.create(Record).then(()=>{
      console.log('Create new instance');
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
      console.log(this.excal.length);
      length = this.excal.length
      // for(var i=1;i<=length;i++){
        
      // }
    })
  }
  setData(setincome:Excal,index:number){
    this.currentIncome = setincome;
    this.currentIndex  = index;
    console.log("hi");
    console.log(this.currentIndex)
  }
  removeAll(){
    this.fireService.deleteAll().then(() =>
    this.refreshList()).catch(err => console.log(err));
  }

}

export interface Excal {
  date:any;
  income:any;
  expense:any;
  total:any;
}


