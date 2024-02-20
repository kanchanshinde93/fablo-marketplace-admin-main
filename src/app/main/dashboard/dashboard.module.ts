import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TicketComponent } from './ticket/ticket.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleMapsModule } from '@angular/google-maps';
const routes: Routes = [
 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ticket',
    component:TicketComponent
  }
]


@NgModule({
  declarations: [
    HomeComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    Ng2FlatpickrModule,
    ContentHeaderModule,
    NgxSpinnerModule,
    GoogleMapsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
 