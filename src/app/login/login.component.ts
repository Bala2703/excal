import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error! : 'error'

  constructor(public authService:AuthService,
    private router : Router) { }

  ngOnInit(): void {
    // if(localStorage.getItem("isLoggedin")){
    //   this.router.navigate(['home',localStorage.getItem('name')])
    // }
    this.login(localStorage.getItem('email'),localStorage.getItem('password') )
  }
  login(email:any,password:any){
    this.authService.loginWithEmail(email,password).then(()=>{
      localStorage.setItem("isLoggedin",'true');
    })
    
  }
}