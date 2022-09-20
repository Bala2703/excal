import { Component, OnInit } from '@angular/core';
// import { Excal } from "../excal.model";
import { FireService } from "../service/fire.service";
import { FormGroup,FormControl } from '@angular/forms';
import { refCount } from 'rxjs';
import { RouteConfigLoadStart } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

income: any;
expense:any;

  constructor(private fireService:FireService){}

  ngOnInit(): void {
  }

  createData(){
    let Record:any={};
    Record['Income'] = this.income;
    // Record['expense'] = this.expense;
    this.fireService.create(Record).then(()=>{
      console.log('Create new instance');
    })
  }

}

export interface Excal {
  date:any;
  income:any;
  expense:any;
  total:any;
}


