import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../intefaces/heroes.inteface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino:string='';
  heroes: Heroe[]=[];
  heroesSelccionado: Heroe | undefined;

  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
  }
  buscar(){
    this.heroesService.getSugerencias(this.termino.trim()).subscribe(res=>{
        this.heroes=res;
    })
  }
  opcionSeleccionada(event:any){
    if(!event.option.value){ 
      this.heroesSelccionado=undefined;
      return}
    const heroe= event.option.value
    this.termino=heroe.superhero;
    this.heroesService.getHeroeById(heroe.id).subscribe(res=>{
      this.heroesSelccionado=res;
    })
  }

}
