import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
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
  ],
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent {
  public pedidos = [
    {
      id: '1',
      local: 'El Milagro',
      direccion: 'Moreno 123',
      estado: 'pendiente',
      fechaCreacion: new Date(),
      fechaCompletada: null,
      productos: [
        { descripcion: 'Sarasa', precio: 12, cantidad: 3 },
        { descripcion: 'Sarasa', precio: 12, cantidad: 3 },
      ],
    },
  ];
}
