import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { JQWidgetsModule } from 'src/app/jqwidgets-module';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

import { ProductSales, productSales } from '../../dashboard-data';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { city } from 'src/app/store/city.action';

@Component({
  selector: 'app-grid-sales',
  standalone: true,
  imports: [CommonModule, DemoMaterialModule, JQWidgetsModule, NgIf, NgFor, ],
  templateUrl: './grid-sales.component.html',
  styleUrls: ['./grid-sales.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridSalesComponent implements AfterViewInit, OnInit {

	@Input() salesProductData:any = {}

	@Input() test:any = {}

	@Input() source:any = {}

	@Input() tempSalesProductData:any = {}

	@Input() variables:any = {}

	@Input() cities:any = []

	city$: Observable<string>
	sales$: Observable<any>


	width = 900

	sourceSales = new jqx.dataAdapter({
		localData: {}
	}) 

	dataSales = {}

	selected = 'Todas';

  columns = [
		{text: 'Codigo', datafield: 'codigo_venta', width: 60 },
		{text: 'Fecha', datafield: 'fecha_venta', width: 120},
		{text: 'Ciudad', datafield: 'ciudad', width: 120},
		{text: 'Tipo', datafield: 'tipo_venta', width: 120},
		{text: 'Producto', datafield: 'producto', width: 120},
		{text: 'Origen', datafield: 'origen_producto', width: 120},
		{text: 'Lote', datafield: 'lote_producto', width: 120},
		{text: 'Orden', datafield: 'orden_compra', width: 120},
		{text: 'Responsable', datafield: 'responsable_venta', width: 120},
		{text: 'Valor', datafield: 'valor_compra', width: 120},
		{text: 'Precio', datafield: 'precio_venta', width: 120},
  ];
 

  constructor(private store: Store<{ city: string, sales: any }>) {
		this.city$ = store.select('city');
		this.sales$ = store.select('sales');
		console.log(this.dataSales)
  }

	setCityFilter() {
		console.log(this.selected)
    this.store.dispatch(city({ city: this.selected }));
		let sales = this.getSalesByCity(this.selected)
		this.source = new jqx.dataAdapter({
			localData: {...sales}
		}) 
		
  }

	getSalesByCity(city:any){
		let newSalesProductData:any = []
		this.salesProductData.map((sale:any)=>{
			if(city===sale.ciudad || city==='Todas'){
				newSalesProductData.push(sale)
			}
		})
		return newSalesProductData
		
	}

	getSalesSource(){
		this.sales$.subscribe(sales => this.dataSales=sales)
		this.sourceSales = new jqx.dataAdapter({
			localData: this.dataSales
		})
		return this.sourceSales
	}


  ngOnInit() {
		
  }

  ngAfterViewInit() {
		
  }

	


}
