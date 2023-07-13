import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Agregar producto {{ data.name }}</h1>
    <div mat-dialog-content [formGroup]="form" style=" padding:5px;">
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Producto</mat-label>
        <input
          type="text"
          matInput
          formControlName="nombre"
          [matAutocomplete]="auto"
        />
        <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
          <mat-option
            *ngFor="let option of filteredOptions | async"
            [value]="option"
          >
            {{ option }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Cantidad</mat-label>
        <input matInput type="number" formControlName="cantidad" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions style="justify-content: flex-end;">
      <button mat-button (click)="onNoClick()">CERRAR</button>
      <button
        mat-raised-button
        color="primary"
        cdkFocusInitial
        (click)="agregarProducto()"
        [disabled]="form.invalid"
      >
        AGREGAR
      </button>
    </div>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class CrearProductoDialog {
  public form: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cantidad: new FormControl(1, Validators.required),
    precioUnitario: new FormControl(1),
    precioTotal: new FormControl(1),
  });

  public productos: any[] = [];
  public filteredOptions?: Observable<string[]>;
  public productosDelPedido: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearProductoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    const localStorageData = localStorage.getItem('productos') ?? '[]';
    this.productos = JSON.parse(localStorageData);

    this.filteredOptions = this.form.controls['nombre'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos
      .map((x: any) => x.descripcion)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  agregarProducto(): void {
    const precioProducto = (
      this.productos.find((x) => {
        return x.descripcion === this.form.value['nombre'];
      }) as any
    )?.final;
    this.form.controls['precioUnitario'].setValue(precioProducto);
    this.form.controls['precioTotal'].setValue(
      precioProducto * this.form.controls['cantidad'].value
    );

    this.dialogRef.close(this.form.value);
  }
}
