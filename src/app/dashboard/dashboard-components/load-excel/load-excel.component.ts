import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { NgFor, NgIf } from '@angular/common';
import * as Excel from '@grapecity/spread-excelio';
import * as GC from '@grapecity/spread-sheets';
import * as XLSX from 'xlsx';

import { ProductSales, productSales } from '../../dashboard-data';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { city } from 'src/app/store/city.action';
import { sales } from 'src/app/store/sales.action';

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
  @Output() updateCities = new EventEmitter <any>();
  @Output() updateTopFiveSaleProduct = new EventEmitter <any>();

  city$: Observable<string>

  getCities = (salesProductData:any) => {
    let cities:any = []
    let state:any = false
    salesProductData?.map((sale:any)=>{
      cities.map((city:any)=>{
        if(city===sale.ciudad){
          state = true
        }
      })
      if(state===false){cities.push(sale.ciudad)}
      state = false
    })
    return cities
  }


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
      this.store.dispatch(sales(new jqx.dataAdapter({
        localData: {...jsonData?.Sheet1}
      })));

      this.updateSalesProductDataSource.emit(
        new jqx.dataAdapter({
          localData: {...jsonData?.Sheet1}
        })
      )
      this.updateSalesVariables.emit(
        this.getVariables(jsonData?.Sheet1)
      )
      this.updateCities.emit(
        this.getCities(jsonData?.Sheet1)
      )
      this.updateTopFiveSaleProduct.emit(
        this.getDataSaleTopFiveProducts(jsonData?.Sheet1)
      )
      
    }
    this.reader.readAsBinaryString(file);
  }

  getDataSaleTopFiveProducts(salesProductData:any){
    let dataSale:any = {}
    let sortDataSale: any = []
    let categories:any = []
    let data:any = []

    salesProductData.map((sale:any)=>{
      if(dataSale[sale.producto] === undefined){
        dataSale[sale.producto] = 1
      }else{
        dataSale[sale.producto] = dataSale[sale.producto]+1
      }
    })

    var items = Object.keys(dataSale).map(function(key) {
      return [key, dataSale[key]];
    });

    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    sortDataSale = items.slice(0, 5)
    sortDataSale.map((item:any[])=>{
      categories.push(item[0])
      data.push(item[1])
    })
    return {
      "categories": categories,
      "data": data
    }
  }

  constructor(private store: Store<{ city: string }>) {
    this.excelIO = new Excel.IO();
    this.spread = new GC.Spread.Sheets.Workbook();
    this.reader = new FileReader();
    this.city$ = store.select('city');
  }


  ngOnInit(): void {
  }

}
