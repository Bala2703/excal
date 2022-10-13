import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error! : 'error'
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }
  login(email:any,password:any){
    this.authService.loginWithEmail(email,password)
    
  }
}