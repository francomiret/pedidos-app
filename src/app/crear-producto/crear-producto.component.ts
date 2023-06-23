import { Component } from '@angular/core';
import { read, utils } from 'xlsx';
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent {
  public convertedJSON!: string;
  $events: any;

  public fileUpload(event: any) {
    console.log(event)
    const selectedFiles = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFiles);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        const data = utils.sheet_to_json(workbook.Sheets[sheet]);
        this.convertedJSON = JSON.stringify(data, undefined, 4);
      });
    };
  }
}
