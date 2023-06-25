import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
 
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Cliente/';
  constructor(private htttp: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    //this.htttp.get(this.myAppUrl+this.myApiUrl)
    return this.htttp.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCliente(id: number):Observable<Cliente>{
    return this.htttp.get<Cliente>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  
  deleteCliente(id: number): Observable<void>{
    return this.htttp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente>{
    return this.htttp.post<Cliente>(`${this.myAppUrl}${this.myApiUrl}`, cliente );
  }
  
  updateCliente(id: number, cliente: Cliente): Observable<void>{
     return this.htttp.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,cliente);
  }
}
