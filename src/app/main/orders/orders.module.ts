import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent 
  },
  {
    path: 'orderList',
    component: OrderListComponent
  },
  {
    path: 'orderDetails',
    component: OrderDetailsComponent
  }
] 

@NgModule({
  declarations: [
    OrderListComponent, 
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    ContentHeaderModule,
    NgxDatatableModule,
    Ng2FlatpickrModule,
    NgbTooltipModule,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule { }
