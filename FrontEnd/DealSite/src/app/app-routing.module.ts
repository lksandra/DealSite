//this module is the routing module. helps in enabling this server to load
//an appropriate component's view template

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {AlldealsComponent} from './alldeals/alldeals.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {MostViewedDealsComponent} from './most-viewed-deals/most-viewed-deals.component';
import {DealUploadFormComponent} from './deal-upload-form/deal-upload-form.component';
import {RegisterAdvertiserComponent} from './register-advertiser/register-advertiser.component'


const routes: Routes =[
  {path: 'routes/allDeals', component: AlldealsComponent},
  {path: '', redirectTo: 'routes/allDeals', pathMatch: 'full'},
  {path: 'routes/dealDetail:id', component: ProductDetailComponent},
  {path: 'routes/mostViewedDeals', component:MostViewedDealsComponent },
  {path: 'routes/dealUpload', component: DealUploadFormComponent},
  {path: 'routes/registerAdvertiser', component:RegisterAdvertiserComponent }
] 

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
