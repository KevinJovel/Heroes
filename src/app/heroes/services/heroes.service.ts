import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../intefaces/heroes.inteface';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlBase: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.urlBase}/heroes`);
  }
  getHeroeById(id):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.urlBase}/heroes/${id}`);
  }
  getSugerencias(termino):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.urlBase}/heroes/?q=${termino}&_limit=6`);
  }
  agregarHeroe(heroe: Heroe): Observable<Heroe>{
   return this.http.post<Heroe>(`${this.urlBase}/heroes`, heroe);
  }
  modificaHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this.urlBase}/heroes/${heroe.id}`,heroe);
   }
   borrarHeroe(id: string): any{
    return this.http.delete(`${this.urlBase}/heroes/${id}`);
   }
}
