import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleMapsModule } from '@angular/google-maps';
import { CoreCommonModule } from '@core/common.module';
/* import { AgmCoreModule } from '@agm/core'; */
/*  */

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
    component: OutletDetailsComponent,
    
  },
] 
 
@NgModule({
  declarations: [
    OutletComponent,
    AddOutletComponent,
    OutletDetailsComponent
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
    NgxSpinnerModule,
    FormsModule,
    GoogleMapsModule,  
    CoreCommonModule,
   /*  AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw&region=IN'
    }) */
  ]
  ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 
})
export class OutletInfoModule { }
