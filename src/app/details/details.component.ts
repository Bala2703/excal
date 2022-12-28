import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Excal } from '../excal.model';
import { FireService } from "../service/fire.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  excal!: Excal[];
  currentIncome?: Excal;
  currentIndex = -1;
  curr: any;
  incomeView: any;
  expenseView: any;
  currdelete!:any;
  constructor(private fireService: FireService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveData();
  }
  retrieveData(): void {
    this.fireService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        })
        )
      )
    ).subscribe((data: Excal[]) => {
      this.excal = data;
    })
  }
  setData(setincome: Excal, index: number) {
    this.currentIncome = setincome;
    this.currentIndex = index;
  }
  refreshList() {
    this.currentIncome = undefined;
    this.currentIndex = -1;
    this.retrieveData();
  }
  removeAll() {
    if (confirm("Are you sure?")) {
      this.fireService.deleteAll().then(() =>
        this.refreshList()).catch(err => console.log(err));
    }
  }
  currentData() {
    this.fireService.getCurrentData().subscribe(data => {
      this.incomeView = data[this.currentIndex].incomeres;
      this.expenseView = data[this.currentIndex].expenseres;
    });
  }

  Onselect() {
    this.router.navigate(['home', localStorage.getItem('name')])
  }
}
