import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    RouterModule,
    MatTableModule,
  ],
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent {
  constructor() {
    this.pedidosPendientes = JSON.parse(
      localStorage.getItem('pedidos') ?? '[]'
    )?.filter((x: any) => x.estado === 'pendiente');

    this.pedidosCompletados = JSON.parse(
      localStorage.getItem('pedidos') ?? '[]'
    )?.filter((x: any) => x.estado === 'completado');
  }
  public pedidosPendientes: any[] = [];
  public pedidosCompletados: any[] = [];

  public getDataSource(item: any) {
    return [...item.productos];
  }

  displayedColumns: string[] = [
    'nombre',
    'precioUnitario',
    'cantidad',
    'precioTotal',
  ];

  getTotalCost(productos: any[]) {
    return productos
      .map((t) => Number(t.precioTotal))
      .reduce((acc, value) => acc + value, 0);
  }
}
