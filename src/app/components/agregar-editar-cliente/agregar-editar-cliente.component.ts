import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-agregar-editar-cliente',
  templateUrl: './agregar-editar-cliente.component.html',
  styleUrls: ['./agregar-editar-cliente.component.css']
})

export class AgregarEditarClienteComponent {
loading: boolean = false;
form: FormGroup;
id: number;

operacion: string = 'Agregar';
constructor(private fb: FormBuilder,
  private _clienteService: ClienteService,
  private _snackBar: MatSnackBar,
  private router: Router,
  private aRoute: ActivatedRoute){
  this.form = this.fb.group({
    nombre: ['', Validators.required],
    documento: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', Validators.required]
  })
  this.id= Number(this.aRoute.snapshot.paramMap.get('id'));
  
}

ngOnInit(): void{
  if(this.id != 0){
    this.operacion='Editar';
    this.obtenerCliente(this.id);
  }
}

obtenerCliente(id: number){
  this.loading= true;
  this._clienteService.getCliente(id).subscribe(data =>{
    this.form.setValue({
      nombre: data.nombre,
      documento: data.documento,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email
    })
    console.log(data)
    this.loading= false;
  })
}


agregarEditarCliente(){ 
/* const nombre = this.form.get('nombre)?.value; */

//Armamos el objeto
const cliente: Cliente = {
  nombre:this.form.value.nombre,
  documento:this.form.value.documento,
  direccion:this.form.value.direccion,
  telefono:this.form.value.telefono,
  email:this.form.value.email
}
 if(this.id !=0){
  cliente.id = this.id;
  this.editarCliente(this.id, cliente);
 }else{
  this.agregarCliente(cliente);
 }
}

editarCliente(id: number, cliente: Cliente){
  this.loading= true;
this._clienteService.updateCliente(id, cliente).subscribe(() => {
  this.loading= false;
  this.mensajeExito('actualizado');
  this.router.navigate(['/listClientes']);
})
}

agregarCliente(cliente: Cliente){
  //Enviamos objeto al back-end
this._clienteService.addCliente(cliente).subscribe(data => {
  
  this.mensajeExito('registrado');
  this.router.navigate(['/listClientes']);
})
}

mensajeExito(texto: string){
  this._snackBar.open(`El cliente fue ${texto} con Exito`, '',{
    duration: 4000,
    horizontalPosition: 'right'
    
  });
 }

}
