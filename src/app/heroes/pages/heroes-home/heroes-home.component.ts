import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/intefaces/auth.inteface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styles: [
    `
    .container{
      margin:15px;
    }
    `
  ]
})
export class HeroesHomeComponent implements OnInit {
  get auth(){
    return this.authService.getAuth;
  }
  constructor(private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    //COnfirmar en el backend
    //usuario
    this.router.navigate(['./auth/login']);

  }

}
