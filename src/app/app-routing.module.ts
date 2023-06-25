import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListadoClienteComponent } from './components/listado-cliente/listado-cliente.component';
import { AgregarEditarClienteComponent } from './components/agregar-editar-cliente/agregar-editar-cliente.component';
import { VerClienteComponent } from './components/ver-cliente/ver-cliente.component';

const routes: Routes = [
  {path:'', redirectTo: 'listClientes', pathMatch: 'full' },
  {path: 'listClientes', component: ListadoClienteComponent},
  {path: 'agregarCliente', component: AgregarEditarClienteComponent},
  {path: 'verCliente/:id', component: VerClienteComponent},
  {path: 'editarCliente/:id', component: AgregarEditarClienteComponent},
  {path: '**', redirectTo:'listClientes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
