import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Heroe } from '../../intefaces/heroes.inteface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{
      width:100%;
      border-radius: 5px;
    }`
  ]
})
export class HeroeComponent implements OnInit {
  heroe: Heroe;
  constructor(private rutaActiva: ActivatedRoute, private heroeService: HeroesService, private router:Router) { }

  ngOnInit(): void {
    this.rutaActiva.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroeById(id))
      ).subscribe(res => {
        this.heroe = res;
      });

    //forma clasica

    // this.rutaActiva.params.subscribe(({id})=>{
    //    this.heroeService.getHeroeById(id).subscribe(res=>{
    //     this.heroe=res;
    //     console.log(this.heroe);
    //    })
    // })
    // console.log(this.heroe);
  }
  regresar(){
    this.router.navigate(['/heroes/listado'])
  }

}
