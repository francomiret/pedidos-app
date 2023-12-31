import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    this.pedidos = JSON.parse(localStorage.getItem('pedidos') ?? '[]');
  }
  public pedidos: any[] = [];

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

  public openPDF(id: string): void {
    const descargarPDF = confirm('¿Desea descargar el pedido en PDF?');
    if (descargarPDF) {
      let DATA: any = document.getElementById(id);
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 100;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('pedido.pdf');
      });
    }
  }
}
