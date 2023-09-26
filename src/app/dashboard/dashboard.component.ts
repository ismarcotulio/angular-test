import { Component, AfterViewInit } from '@angular/core';
import { SalesOverviewComponent } from './dashboard-components/sales-overview/sales-overview.component';
import { OurVisiterComponent } from './dashboard-components/our-visiter/our-visiter.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ActivityTimelineComponent } from './dashboard-components/activity-timeline/activity-timeline.component';
import { LoadExcelComponent } from './dashboard-components/load-excel/load-excel.component';

import { ProductSales, productSales } from './dashboard-data';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		CommonModule,
		SalesOverviewComponent, 
		OurVisiterComponent, 
		ProfileComponent, 
		ContactsComponent, 
		ActivityTimelineComponent,
		LoadExcelComponent
	],
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {

	salesProductData:ProductSales[] = productSales

	updateSalesProduct(newSalesProduct: ProductSales[]){
		this.salesProductData = newSalesProduct
	}

	ngAfterViewInit() { }

}
