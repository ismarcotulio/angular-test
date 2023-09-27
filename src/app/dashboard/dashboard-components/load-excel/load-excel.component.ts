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
  @Output() updateSalesProductDataSource = new EventEmitter <any>();
  @Output() updateSalesVariables = new EventEmitter <any>();

  getVariables = (salesProductData:any) => {
    let cantidadVentas = 0
    let cantidadVentasCredito = 0
    let cantidadVentasContado = 0
    let cantidadProductosOrigenInternacional = 0
    let cantidadProductosOrigenNacional = 0
    let totalVentas = 0
    let totalUtilidad = 0
    let totalGanancias = 0

		salesProductData?.map((sale:any)=>{
      cantidadVentas = cantidadVentas + 1
      totalVentas = totalVentas + sale.precio_venta
      totalUtilidad = totalUtilidad + sale.valor_compra
      totalGanancias = totalVentas - totalUtilidad
      if(sale.tipo_venta === 'Contado'){
        cantidadVentasContado = cantidadVentasContado + 1
      }else{
        cantidadVentasCredito = cantidadVentasCredito + 1
      }
      if(sale.origen_producto === 'Nacional'){
        cantidadProductosOrigenNacional = cantidadProductosOrigenNacional + 1
      }else{
        cantidadProductosOrigenInternacional = cantidadProductosOrigenInternacional + 1
      }
      console.log(sale)
    })

    let variables = {
			"cantidadVentas":cantidadVentas,
			"cantidadVentasCredito":cantidadVentasCredito,
			"cantidadVentasContado":cantidadVentasContado,
			"cantidadProductosOrigenInternacional": cantidadProductosOrigenInternacional,
			"cantidadProductosOrigenNacional": cantidadProductosOrigenNacional,
			"totalVentas":totalVentas,
			"totalUtilidad": totalUtilidad,
			"totalGanancias": totalGanancias
		}
		
		return variables
	}


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
      this.updateSalesProductDataSource.emit(
        new jqx.dataAdapter({
          localData: jsonData?.Sheet1
        })
      )
      this.updateSalesVariables.emit(
        this.getVariables(jsonData?.Sheet1)
      )
      
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
