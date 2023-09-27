import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { JQWidgetsModule } from 'src/app/jqwidgets-module';
import { NgFor, NgIf } from '@angular/common';

import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

import { ProductSales, productSales } from '../../dashboard-data';

@Component({
  selector: 'app-grid-sales',
  standalone: true,
  imports: [DemoMaterialModule, JQWidgetsModule, NgIf, NgFor, ],
  templateUrl: './grid-sales.component.html',
  styleUrls: ['./grid-sales.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridSalesComponent implements AfterViewInit, OnInit {

	@Input() salesProductData:any = {}

	@Input() test:any = {}

	@Input() source:any = {}

	@Input() variables:any = {}

	width = 900



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
 

  constructor() {
		
    
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
	
  }

	


}
