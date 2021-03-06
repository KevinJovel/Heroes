import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../intefaces/auth.inteface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string=environment.baseUrl;
  private _auth:Auth | undefined;

  get getAuth(){
    return { ...this._auth }
  }

  constructor(private http:HttpClient) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
                    .pipe(
                      tap(auth=>this._auth=auth)
                    )
  }
}
