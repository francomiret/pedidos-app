import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrearProductoDialog } from './agregar-producto-dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

export interface Producto {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
}

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
    MatDialogModule,
    MatAutocompleteModule,
    CommonModule,
  ],
})
export class CrearPedidoComponent {
  constructor(public dialog: MatDialog, private router: Router) {
    const localStorageData = localStorage.getItem('clientes') ?? '[]';
    this.clientes = JSON.parse(localStorageData);

    this.filteredOptions = this.form.controls['cliente'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  public filteredOptions?: Observable<string[]>;
  public clientes = [];

  public form: FormGroup = new FormGroup({
    cliente: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    productos: new FormControl([], Validators.required),
    fechaDeCreacion: new FormControl(Date.now()),
  });

  displayedColumns: string[] = [
    'nombre',
    'precioUnitario',
    'cantidad',
    'precioTotal',
    'actions',
  ];

  dataSource = this.form.controls['productos'].valueChanges;

  public crearPedido() {
    const pedidos: any[] = JSON.parse(localStorage.getItem('pedidos') ?? '[]');
    pedidos.unshift(this.form.value);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    this.router.navigate(['']);
  }

  public borrar(index: any) {
    const deleteItem = confirm('¿Desea quitar el poroducto?');
    if (deleteItem) {
      const data = this.form.controls['productos'].value;
      data.splice(index, 1);
      this.form.controls['productos'].setValue(data);
    }
  }

  public clienteSeleccionado(event: any) {
    const cliente: any = this.clientes.find(
      (x: any) => x.nombre === event.option.value
    );
    this.form.controls['direccion'].setValue(cliente?.direccion ?? '');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clientes
      .map((x: any) => x.nombre)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearProductoDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.form.controls['productos'].setValue([
          ...this.form.controls['productos'].value,
          result,
        ]);
      }
    });
  }

  getTotalCost(productos: any[]) {
    if (productos) {
      return productos
        .map((t) => Number(t.precioTotal))
        .reduce((acc, value) => acc + value, 0);
    } else {
      return 0;
    }
  }
}
