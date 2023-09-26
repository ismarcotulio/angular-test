import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { NgFor, NgIf } from '@angular/common';
import * as Excel from '@grapecity/spread-excelio';
import * as GC from '@grapecity/spread-sheets';
import * as XLSX from 'xlsx';

import { ProductSales, productSales } from '../../dashboard-data';

@Component({
  selector: 'app-load-excel',
  standalone: true,
  imports: [DemoMaterialModule, NgIf, NgFor],
  templateUrl: './load-excel.component.html'
})
export class LoadExcelComponent implements OnInit {

  private excelIO;
  private spread;
  private reader;

  @Output() updateSalesProductData = new EventEmitter <ProductSales[]>();

  onFileChange(args: any) {
    let workBook:any = null;
    let jsonData:any = null;
    const file = args.target.files[0];

    this.reader.onload = (event) => {
      const data = this.reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial:any, name:any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.updateSalesProductData.emit(jsonData?.Sheet1)
      
    }
    this.reader.readAsBinaryString(file);
  }

  constructor() {
    this.excelIO = new Excel.IO();
    this.spread = new GC.Spread.Sheets.Workbook();
    this.reader = new FileReader();
  }


  ngOnInit(): void {
  }

}