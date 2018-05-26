//htis module queries all the deals from the backend, upon request from the custoemr.

import { Component, OnInit } from '@angular/core';

import {DealsService} from '../services/deals.service';
import {Product} from '../data/product';





@Component({
  selector: 'app-alldeals',
  templateUrl: './alldeals.component.html',
  styleUrls: ['./alldeals.component.css']
})
export class AlldealsComponent implements OnInit {

  constructor(private dealsService : DealsService) { }

  ngOnInit() {
    console.log('ngOninit of alldeals component');
    this.getAllDeals();
  }

  products : Product[];
  productDetail: Product;

  getAllDeals() : void{
    this.dealsService.getAllDeals().subscribe(
      (productsFetched) => {
        console.log('products obtained in alldeal comp:\n', productsFetched);
        this.products = productsFetched;
      },
      (err)=>{
        console.log('some error in fetching products from dealService to alldeals comp:\n', err);
      }
    );
  };

  sendProductToDetailView(product : Product): void{
    console.log('sendProductToDetailView executing');
    this.dealsService.productDetailViewSource.next(product);
  };

  




}
