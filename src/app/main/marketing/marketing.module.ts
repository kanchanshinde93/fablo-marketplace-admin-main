import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiesmentComponent } from './advertiesment/advertiesment.component';
import { PromotionComponent } from './promotion/promotion.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'advertiesment',
    component: AdvertiesmentComponent
  },
  {
    path: 'promotion',
    component: PromotionComponent
  }
]

@NgModule({
  declarations: [
    AdvertiesmentComponent,
    PromotionComponent
  ],
  imports: [
    CommonModule,
    Ng2FlatpickrModule,
    FileUploadModule,
    ContentHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MarketingModule { }
