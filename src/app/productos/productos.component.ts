import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
  ],
})
export class ProductosComponent implements AfterViewInit {
  displayedColumns: string[] = ['descripcion', 'final'];
  dataSource: MatTableDataSource<unknown>;
  convertedJSON = '';
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor() {
    let productos = [];
    if (!!localStorage.getItem('marquitosData')) {
      const localStorageData = localStorage.getItem('marquitosData') ?? '';
      productos = JSON.parse(localStorageData);
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(productos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public fileUpload(event: any) {
    const selectedFiles = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFiles);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        const data: any[] = utils
          .sheet_to_json(workbook.Sheets[sheet])
          .map((x: any, index: number) => {
            return {
              id: index,
              descripcion: x['Descripción'],
              final: x['Final'],
            };
          });

        this.convertedJSON = JSON.stringify(data);
        localStorage.setItem('marquitosData', this.convertedJSON);
        this.dataSource = new MatTableDataSource(data);
      });
    };
  }
}
