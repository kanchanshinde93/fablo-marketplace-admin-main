import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { MerchantComponent } from './merchant-info/merchant/merchant.component';
import { CustomerComponent } from './customer/customer.component';
import { DeliveryPartnerComponent } from './delivery-partner/delivery-partner.component';
import { AgentComponent } from './agent/agent.component';
import { RouterModule, Routes } from '@angular/router';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { OffersComponent } from './merchant-info/offers/offers.component';
import { OrderHistoryComponent } from './merchant-info/order-history/order-history.component';
import { MenuComponent } from './merchant-info/menu/menu.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { AddCategoryComponent } from './merchant-info/add-category/add-category.component';

import { AddProductComponent } from './merchant-info/add-product/add-product.component';
import { AddSubcategoryComponent } from './merchant-info/add-subcategory/add-subcategory.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MerchanhtDetailsComponent } from './merchant-info/merchanht-details/merchanht-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreCommonModule } from '@core/common.module'  ;
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent 
  },

  {
    path: 'merchant',
    component: MerchantComponent
  },
  {
    path: 'merchantDetails',
    component: MerchanhtDetailsComponent
  },
  
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  },
  {
    path: 'add-sabcategory',
    component: AddSubcategoryComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  
  {
    path: 'offers',
    component: OffersComponent
  },
  {
    path: 'orderHistory',
    component: OrderHistoryComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'deliveryPartner',
    component: DeliveryPartnerComponent
  },
  {
    path: 'agent',
    component: AgentComponent
  }

]

@NgModule({
  declarations: [
    UsersComponent,
    MerchantComponent,
    CustomerComponent,
    DeliveryPartnerComponent,
    AgentComponent,
    
    OffersComponent,
    OrderHistoryComponent,
    MenuComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddSubcategoryComponent,
    MerchanhtDetailsComponent,
    
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    NgxDatatableModule,
CoreCommonModule, 
    CsvModule,
    FileUploadModule,
    ContentHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2FlatpickrModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class UserTypeModule { }
