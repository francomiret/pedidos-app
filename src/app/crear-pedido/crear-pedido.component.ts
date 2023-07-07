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
import { Component, ViewChild, ElementRef } from '@angular/core';
// import { jsPDF } from 'jspdf';

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
    CommonModule,
  ],
})
export class CrearPedidoComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  @ViewChild('elementToCapture') elementToCapture!: ElementRef;

  public form: FormGroup = new FormGroup({
    cliente: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    productos: new FormControl([], Validators.required),
    alcaraciones: new FormControl(''),
    fechaDeCreacion: new FormControl(Date.now()),
    estado: new FormControl('pendiente', Validators.required),
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
    console.log(this.form.value);
    const pedidos: any[] = JSON.parse(localStorage.getItem('pedidos') ?? '[]');
    pedidos.unshift(this.form.value);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    this.router.navigate(['']);
    // this.generatePDF();
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

  // generatePDF() {
  //   const doc = new jsPDF('l', 'mm', [1200, 1210]);

  //   const pdfjs = document.querySelector('#div')?.innerHTML;

  //   // Convert HTML to PDF in JavaScript
  //   if (pdfjs) {
  //     doc.addHml(pdfjs, {
  //       callback: function (doc) {
  //         doc.save('output.pdf');
  //       },
  //       x: 10,
  //       y: 10,
  //     });
  //   }
  // }
}
