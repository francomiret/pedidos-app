import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';

const routes: Routes = [
  { path: '', redirectTo: 'pedido', pathMatch: 'full' },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'agregar-producto', component: CrearProductoComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
