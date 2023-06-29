import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

export interface Producto {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
}

const ELEMENT_DATA: Producto[] = [
  { cantidad: 1, nombre: 'Hydrogen', precioUnitario: 1.0079, precioTotal: 3 },
  { cantidad: 2, nombre: 'Helium', precioUnitario: 4.0026, precioTotal: 3 },
  { cantidad: 3, nombre: 'Lithium', precioUnitario: 6.941, precioTotal: 3 },
  { cantidad: 4, nombre: 'Beryllium', precioUnitario: 9.0122, precioTotal: 3 },
];
@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
  ],
})
export class CrearPedidoComponent {
  public control = new FormControl('');
  public form: FormGroup = new FormGroup({
    cliente: new FormControl(''),
    direccion: new FormControl(''),
    productos: new FormArray([]),
    alcaraciones: new FormControl(''),
    fechaDeCreacion: new FormControl(Date.now()),
    estado: new FormControl('pendiente'),
  });
  displayedColumns: string[] = [
    'nombre',
    'precioUnitario',
    'cantidad',
    'precioTotal',
    'actions',
  ];
  dataSource = ELEMENT_DATA;
}
