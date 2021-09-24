import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {

  url: string = 'https://localhost:44314/api/cliente';
  constructor(
    private _http:HttpClient
  ) { 
    
  }

  getClientes(): Observable<Response> {
    return this._http.get<Response>(this.url);
  }

  addCliente(cliente:Cliente): Observable<Response> {
    return this._http.post<Response>(this.url,cliente,httpOption);
  }
}

