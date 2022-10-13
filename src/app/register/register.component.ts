import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  Onsubmit(email:any,password:any,name:any){
    this.authService.registerwithEmail(email,password,name)
    // this.authService.updateuserdata(name,email,password)
  }
}
