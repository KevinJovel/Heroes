import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor(private router:Router,
              private authService:AuthService) { }
  login(){
    //COnfirmar en el backend
    //usuario
    this.authService.login().subscribe(res=>{
      if(res.id){
        this.router.navigate(['./heroes']);
      }else{
        console.log("error")
      }
      
    })
  }
}
