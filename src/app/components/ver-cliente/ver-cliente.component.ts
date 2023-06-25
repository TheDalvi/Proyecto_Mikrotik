import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})
export class VerClienteComponent implements OnInit {
  
  id: number;
  cliente!: Cliente;
  loading: boolean = false;

 /* cliente$!: Observable <Cliente> PIPE ASYNC*/
    constructor(private _clienteService: ClienteService, 
      private aRoute: ActivatedRoute ){
     this.id = Number (this.aRoute.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void{
      // this.cliente$ = this. _clienteService.getCliente(this.id) PIPE AsynC
      this.obtenerCliente();
    }
      obtenerCliente(){
      this.loading=true;
       this._clienteService.getCliente(this.id).subscribe(data =>{
         this.cliente= data;
         this.loading=false;
       })
     } 
}
