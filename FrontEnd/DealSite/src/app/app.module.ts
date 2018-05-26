
//this is the main module file. this is where all the components of this module
//are declared, and this is where the dependency injection happens as 
//a singleton and bootstraps the root component.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AlldealsComponent } from './alldeals/alldeals.component';
import { AppRoutingModule } from './/app-routing.module';
import {DealsService} from './services/deals.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MostViewedDealsComponent } from './most-viewed-deals/most-viewed-deals.component';
import { DealUploadFormComponent } from './deal-upload-form/deal-upload-form.component';
import { RegisterAdvertiserComponent } from './register-advertiser/register-advertiser.component';


@NgModule({
  declarations: [
    AppComponent,
    AlldealsComponent,
    ProductDetailComponent,
    MostViewedDealsComponent,
    DealUploadFormComponent,
    RegisterAdvertiserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DealsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
