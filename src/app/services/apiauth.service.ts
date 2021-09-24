import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Response } from "../models/response";
import { Usuario } from "../models/usuario";
import { map } from "rxjs/operators";
import { Login } from "../models/login";

const httpOptions = {
    headers: new HttpHeaders({
      'Contend-Type': 'application/json'
    })
  };

  @Injectable({providedIn:'root'})

export class ApiAuthService {
    url:string = "https://localhost:44314/api/user/login";

    private usuarioBehavior:BehaviorSubject<Usuario>;
    public usuario:Observable<Usuario>;

    public get usuarioData():Usuario {
      return this.usuarioBehavior.value;
    }

    constructor(private _http: HttpClient) {
      this.usuarioBehavior = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
      this.usuario = this.usuarioBehavior.asObservable();
    }

    login(login:Login):Observable<Response>{
        return this._http.post<Response>(this.url,login,httpOptions)
        .pipe(map(res => {
          if(res.exito === 1)
          {
            const user:Usuario = res.data;
            localStorage.setItem("usuario",JSON.stringify(user)); 
            this.usuarioBehavior.next(user);
          }
          return res;
        })
        );
    }

    logout() {
      localStorage.removeItem("usuario");
      this.usuarioBehavior.next(null!);
    }
}