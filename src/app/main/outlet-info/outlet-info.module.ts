import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletComponent } from './outlet/outlet.component';
import { RouterModule, Routes } from '@angular/router';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AddOutletComponent } from './add-outlet/add-outlet.component';
import { FileUploadModule } from 'ng2-file-upload';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';

const routes: Routes = [
  {
    path: 'outlet',
    component: OutletComponent
  },
  {
    path: 'addOutlet',
    component: AddOutletComponent
  },
  {
    path: 'outletDetails',
    component: OutletDetailsComponent
  },
] 
 
@NgModule({
  declarations: [
    OutletComponent,
    AddOutletComponent,
  ],
  imports: [ 
    CommonModule,
    FileUploadModule,
    NgbModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    CsvModule,
    ContentHeaderModule,
    ReactiveFormsModule,
    FormsModule,
  ]
  ,
 
})
export class OutletInfoModule { }
